import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Redux
import { connect } from 'react-redux';

// Next components
import { Link } from 'routes';

const items = [
  {
    name: 'Data',
    pathnames: ['/admin/Data', '/admin/DataDetail'],
    component: <Link route="admin_data"><a>Data</a></Link>
  },
  {
    name: 'Dashboards',
    pathnames: ['/admin/Dashboards', '/admin/DashboardsDetail'],
    component: <Link route="admin_dashboards"><a>Dashboards</a></Link>
  },
  {
    name: 'Insights',
    pathnames: ['/admin/Insights', '/admin/InsightsDetail'],
    component: <Link route="admin_insights"><a>Insights</a></Link>
  },
  {
    name: 'Resources',
    pathnames: ['/admin/Resources', '/admin/ResourcesDetail'],
    component: <Link route="admin_resources"><a>Resources</a></Link>
  },
  {
    name: 'Widgets',
    pathnames: ['/admin/Widgets', '/admin/WidgetsDetail'],
    component: <Link route="admin_widgets"><a>Widgets</a></Link>
  },
  {
    name: 'Logout',
    component: <a href="/logout">Logout</a>
  }
];

class Header extends React.PureComponent {
  render() {
    const { routes } = this.props;

    return (
      <header className="c-header -transparent">
        <div className="header-secondary">
          {/* We will load the script generated */}
        </div>
        <div className="l-container">
          <div className="header-main">
            <h1 className="header-logo -admin">
              <Link route="admin_home">
                <a>
                  {/* <svg><use xlinkHref="#icon-logo-cms" /></svg> */}
                  <span>PREP Manager</span>
                </a>
              </Link>
            </h1>
            <nav className="header-menu">
              <ul>
                {items.map((item) => {
                  const activeClassName = classnames({
                    '-active': item.pathnames && item.pathnames.includes(routes.pathname)
                  });

                  return (
                    <li key={item.name} className={activeClassName}>
                      {item.component}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  routes: PropTypes.object
};

const mapStateToProps = state => ({
  routes: state.routes
});

export default connect(mapStateToProps)(Header);
