import React from 'react';
import { singular } from 'pluralize';

import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setUser } from 'redactions/user';
import { setRouter } from 'redactions/routes';

// Services
import DashboardsService from 'services/DashboardsService';
import ToolsService from 'services/ToolsService';
import IndicatorsService from 'services/IndicatorsService';

// Utils
import { capitalizeFirstLetter } from 'utils/utils';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';

// Tabs
import DashboardsTab from 'components/admin/dashboards/DashboardsTab';
import ToolsTab from 'components/admin/tools/ToolsTab';
import IndicatorsTab from 'components/admin/indicators/IndicatorsTab';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';

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

    const { tab, id, subtab } = props.url.query;

    this.state = {
      tab,
      id,
      subtab,
      data: {}
    };

    this.service = null;

    switch (tab) {
      case 'dashboards':
        if (id !== 'new') {
          this.service = new DashboardsService({
            authorization: props.user.token
          });
        }
        break;

      case 'tools':
        if (id !== 'new') {
          this.service = new ToolsService({
            authorization: props.user.token
          });
        }
        break;

      case 'indicators':
        if (id !== 'new') {
          this.service = new IndicatorsService({
            authorization: props.user.token
          });
        }
        break;

      default:

    }
  }

  componentWillMount() {
    const { id } = this.state;

    if (this.service) {
      this.service.fetchData(id)
        .then((data) => {
          this.setState({
            data: data || {}
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tab, id, subtab } = nextProps.url.query;

    this.setState({ tab, id, subtab });
  }


  /**
   * HELPERS
   * - getName
  */
  getName() {
    const { tab, id, data } = this.state;

    if (id === 'new') {
      return `New ${singular(tab)}`;
    }

    if (data.name || data.title) {
      return data.name || data.title;
    }

    return '-';
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title={this.getName()}
        description="Dashboards detail..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="row">
              <div className="small-12">
                <div className="page-header-content">
                  <Breadcrumbs
                    items={[{ name: capitalizeFirstLetter(tab), route: 'admin_dashboards', params: { tab } }]}
                  />
                  <Title className="-primary -huge page-header-title" >
                    {this.getName()}
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            <div className="row">
              <div className="small-12">
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
