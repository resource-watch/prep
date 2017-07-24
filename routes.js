// routes.js
const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

// ========================= ADMIN ROUTES =====================
routes.add('admin_home', '/admin', 'admin/Data');
// DATA
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/DataDetail');
routes.add('admin_data', '/admin/data/:tab?', 'admin/Data');

// PARTNERS
routes.add('admin_partners_detail', '/admin/partners/:tab/:id/:subtab?', 'admin/PartnersDetail');
routes.add('admin_partners', '/admin/partners/:tab?/:subtab?', 'admin/Partners');

// DASHBOARDS
routes.add('admin_dashboards_detail', '/admin/dashboards/:tab/:id/:subtab?', 'admin/DashboardsDetail');
routes.add('admin_dashboards', '/admin/dashboards/:tab?/:subtab?', 'admin/Dashboards');


// USERS
routes.add('admin_users', '/admin/users/:tab?/:subtab?', 'admin/users');

// ========================= APP ROUTES =====================
routes.add('home', '/', 'app/Home');

// routes.add('about', '/about', 'app/About');
// routes.add('about_partners', '/about_partners', 'app/Partners');
// routes.add('partner', '/about/partners/:id', 'app/PartnerDetail');

// routes.add('data', '/data', 'app/Explore'); // TODO: create the data page
// routes.add('explore', '/explore', 'app/Explore');
// routes.add('explore_detail', '/explore/:id', 'app/ExploreDetail');

// routes.add('pulse', '/pulse', 'app/Pulse');

// routes.add('dashboards', '/dashboards/:slug?', 'app/Dashboards');

// routes.add('insights', '/insights', 'app/Home'); // TODO: create the insights page

// ----- GET INVOLVED -----
// routes.add('get_involved', '/get-involved', 'app/GetInvolved');
// routes.add('get_involved_detail', '/get-involved/:id', 'app/GetInvolvedDetail');

// ------ MY RW ------------
routes.add('myprep', '/myprep/:tab?/:subtab?', 'app/MyRW');
