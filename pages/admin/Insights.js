import React from 'react';
import PropTypes from 'prop-types';

import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setUser } from 'redactions/user';
import { setRouter } from 'redactions/routes';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Tabs from 'components/ui/Tabs';

// Tabs
import InsightsTab from 'components/admin/insights/InsightsTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Insights',
  value: 'insights',
  route: 'admin_insights',
  params: { tab: 'insights' }
}];

class Insights extends Page {
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
      tab: url.query.tab || 'insights',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'insights',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Insights"
        description="Insights description..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="row">
              <div className="small-12">
                <div className="page-header-content -padding-b-0">
                  <Title className="-primary -huge page-header-title" >
                    Insights
                  </Title>
                  <Tabs
                    options={DATA_TABS}
                    defaultSelected={tab}
                    selected={tab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            <div className="row">
              <div className="small-12">
                {tab === 'insights' &&
                  <InsightsTab tab={tab} subtab={subtab} id={id} />
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Insights.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object
};


export default withRedux(initStore)(Insights);
