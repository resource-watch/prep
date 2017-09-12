// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// routes.add('homepage', '/', 'Home');

// ========================= ADMIN ROUTES =====================

// Home
routes.add('admin_home', '/admin/data/datasets', 'admin/Data'); // Redirecting to admin_data_tab

// Data
routes.add('admin_data', '/admin/data/datasets', 'admin/Data') // Redirecting to admin_data_tab
routes.add('admin_data_detail', '/admin/data/:tab/:id/:subtab?', 'admin/DataDetail');
routes.add('admin_data_tab', '/admin/data/:tab?', 'admin/Data');

// DASHBOARDS
routes.add('admin_dashboards_detail', '/admin/dashboards/:tab/:id/:subtab?', 'admin/DashboardsDetail');
routes.add('admin_dashboards', '/admin/dashboards/:tab?/:subtab?', 'admin/Dashboards');

// INSIGHTS
routes.add('admin_insights_detail', '/admin/insights/:tab/:id/:subtab?', 'admin/InsightsDetail');
routes.add('admin_insights', '/admin/insights/:tab?/:subtab?', 'admin/Insights');

// RESOURCES
routes.add('admin_resources_detail', '/admin/resources/:tab/:id/:subtab?', 'admin/ResourcesDetail');
routes.add('admin_resources', '/admin/resources/:tab?/:subtab?', 'admin/Resources');

// RESOURCES
routes.add('admin_widgets_detail', '/admin/widgets/:tab/:id/:subtab?', 'admin/WidgetsDetail');
routes.add('admin_widgets', '/admin/widgets/:tab?/:subtab?', 'admin/Widgets');

// USERS
routes.add('admin_users', '/admin/users/:tab?/:subtab?', 'admin/users');

module.exports = routes;
