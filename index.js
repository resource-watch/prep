// Load environment variables from .env file if present
require('dotenv').load();

const express = require('express');
const next = require('next');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { parse } = require('url');
const sass = require('node-sass');
const postcssMiddleware = require('postcss-middleware');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const routes = require('./routes');
const auth = require('./auth');
const postcssConfig = require('./postcss.config');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dev = env !== 'production';

// Next app creation
const app = next({ dev });
const handle = routes.getRequestHandler(app);

// Express app creation
const server = express();

function isAuthenticated(req, res, nextAction) {
  if (req.isAuthenticated()) return nextAction();
  // if they aren't redirect them to the home page
  return res.redirect('/');
}

function isAdmin(req, res, nextAction) {
  if (req.user.role === 'ADMIN') return nextAction();
  // if they aren't redirect them to the home page
  return res.redirect('/');
}

// Configuring session and cookie options
const sessionOptions = {
  secret: process.env.SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true
};

if (!dev) {
  const redisClient = redis.createClient(process.env.REDIS_URL);
  sessionOptions.store = new RedisStore({
    client: redisClient,
    logErrors: true
  });
}

// configure Express
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session(sessionOptions));

// Initialize Passport!
auth.initialize(server);

// Initializing next app before express server
app.prepare()
  .then(() => {
    if (!dev) {
      // Add route to serve compiled SCSS from /assets/{build id}/main.css
      // Note: This is is only used in production, in development it is inlined
      const sassResult = sass.renderSync({ file: './css/index.scss', outputStyle: 'compressed' });
      server.get('/admin/styles/:id/index.css', postcssMiddleware(postcssConfig), (req, res) => {
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Cache-Control', 'public, max-age=2592000');
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
        res.send(sassResult.css);
      });
    }

    // Root
    // server.get('/admin', (req, res) => {
    //   res.redirect('/login');
    // });

    // Authentication
    server.get('/admin/auth', auth.authenticate({ failureRedirect: '/admin/login' }), (req, res) => {
      res.redirect('/admin/data/datasets');
    });
    server.get('/auth/user', (req, res) => res.json(req.user));
    server.get('/login', auth.login);
    server.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/login');
    });

    // Admin redirections
    server.get('/admin', (req, res) => res.redirect('/admin/data/datasets'));
    server.get('/admin/data', (req, res) => res.redirect('/admin/data/datasets'));

    // For admin always check if user is authenticated
    server.get('/admin*?', isAuthenticated, isAdmin, (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });

    // Using next routes
    server.use(handle);

    server.listen(port, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${port} [${env}]`);
    });
  });
