import React from 'react';
import PropTypes from 'prop-types';

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
import DatasetTab from 'components/admin/dataset/DatasetTab';
import WidgetsTab from 'components/admin/widgets/WidgetsTab';
import LayersTab from 'components/admin/layers/LayersTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [
  {
    label: 'Datasets',
    value: 'datasets',
    route: 'admin_data',
    params: { tab: 'datasets' }
  },
  {
    label: 'Widgets',
    value: 'widgets',
    route: 'admin_data',
    params: { tab: 'widgets' }
  },
  {
    label: 'Layers',
    value: 'layers',
    route: 'admin_data',
    params: { tab: 'layers' }
  }
];

class Data extends Page {
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

  render() {
    const { user, tab, id, subtab } = this.props;

    if (!user) return null;

    return (
      <Layout
        title="Data"
        description="Data description..."
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="page-header-content -padding-b-0">
              <Title className="-primary -huge page-header-title" >
                Data
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
            {tab === 'datasets' &&
              <DatasetTab tab={tab} subtab={subtab} id={id} />
            }

            {tab === 'widgets' &&
              <WidgetsTab tab={tab} subtab={subtab} id={id} />
            }

            {tab === 'layers' &&
              <LayersTab tab={tab} subtab={subtab} id={id} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

Data.propTypes = {
  user: PropTypes.object,
  routes: PropTypes.object,
  tab: PropTypes.string,
  subtab: PropTypes.string,
  id: PropTypes.string
};

export default withRedux(initStore)(Data);
