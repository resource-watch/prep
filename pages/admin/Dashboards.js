import React from 'react';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setUser } from 'redactions/user';
import { setRouter } from 'redactions/routes';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Tabs from 'components/ui/Tabs';

// Tabs
import DashboardsTab from 'components/admin/dashboards/DashboardsTab';
import ToolsTab from 'components/admin/tools/ToolsTab';
import IndicatorsTab from 'components/admin/indicators/IndicatorsTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Dashboards',
  value: 'dashboards',
  route: 'admin_dashboards',
  params: { tab: 'dashboards' }
}, {
  label: 'Tools',
  value: 'tools',
  route: 'admin_dashboards',
  params: { tab: 'tools' }
}, {
  label: 'Indicators',
  value: 'indicators',
  route: 'admin_dashboards',
  params: { tab: 'indicators' }
}];

class Dashboards extends Page {
  static async getInitialProps({ asPath, pathname, req, store, query, isServer }) {
    const tab = query.tab || 'datasets';
    const { id, subtab } = query;
    const routes = { asPath, pathname, id, subtab, tab };
    const { user } = isServer ? req : store.getState();

    if (isServer) {
      store.dispatch(setUser(user));
      store.dispatch(setRouter(routes));
    }

    return { user, tab, id, subtab, isServer };
  }

  constructor(props) {
    super(props);

    const { url } = props;

    this.state = {
      tab: url.query.tab || 'dashboards',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'dashboards',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Dashboards"
        description="Dashboards description..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="page-header-content -padding-b-0">
              <Title className="-primary -huge page-header-title" >
                Dashboards
              </Title>
              <Tabs
                options={DATA_TABS}
                defaultSelected={tab}
                selected={tab}
              />
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            {tab === 'dashboards' &&
              <DashboardsTab tab={tab} subtab={subtab} id={id} />
            }

            {tab === 'tools' &&
              <ToolsTab tab={tab} subtab={subtab} id={id} />
            }

            {tab === 'indicators' &&
              <IndicatorsTab tab={tab} subtab={subtab} id={id} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

Dashboards.propTypes = {
  user: React.PropTypes.object,
  url: React.PropTypes.object
};

export default withRedux(initStore)(Dashboards);
