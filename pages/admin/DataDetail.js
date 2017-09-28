import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { bindActionCreators } from 'redux';
import { setUser } from 'redactions/user';
import { singular } from 'pluralize';

// Utils
import { capitalizeFirstLetter } from 'utils/utils';

// Services
import DatasetService from 'services/DatasetService';
import WidgetsService from 'services/WidgetsService';
import LayersService from 'services/LayersService';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Breadcrumbs from 'components/ui/Breadcrumbs';

// Tabs
import DatasetTab from 'components/admin/dataset/DatasetTab';
import WidgetsTab from 'components/admin/widgets/WidgetsTab';
import LayersTab from 'components/admin/layers/LayersTab';

// Components
import Title from 'components/ui/Title';

class DataDetail extends Page {
  static async getInitialProps({ asPath, pathname, req, store, query, isServer }) {
    const tab = query.tab || 'datasets';
    const { id, subtab, dataset } = query;
    const url = { asPath, pathname };
    const data = {};
    const { user } = isServer ? req : store.getState();

    if (isServer) {
      store.dispatch(setUser(user));
    }

    return { user, tab, id, subtab, url, data, dataset };
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.service = null;
    const { id, tab } = this.props;

    switch (tab) {
      case 'datasets':
        if (id !== 'new') {
          this.service = new DatasetService(id, {
            apiURL: process.env.WRI_API_URL
          });
        }
        break;

      case 'widgets':
        if (id !== 'new') {
          console.log(id);
          this.service = new WidgetsService();
        }
        break;

      case 'layers':
        if (id !== 'new') {
          this.service = new LayersService();
        }
        break;

      default:

    }

    if (this.service) {
      // Fetch the dataset / layer / widget depending on the tab
      this.service.fetchData({ id })
        .then((data) => {
          this.setState({ data });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { tab, id, subtab } = nextProps.url.query;

  //   this.setState({ tab, id, subtab });
  // }

  /**
   * HELPERS
   * - getName
  */
  getName() {
    const { tab, id } = this.props;
    const { data } = this.state;

    if (id === 'new') {
      return `New ${singular(tab)}`;
    }

    if (data.attributes && data.attributes.name) {
      return data.attributes.name;
    }

    if (data.name) {
      return data.name;
    }

    return 'Dataset';
  }

  render() {
    const { user, tab, id, subtab, url, dataset } = this.props;

    return (
      <Layout
        title={this.getName()}
        description="Data detail..."
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
                    items={[{ name: capitalizeFirstLetter(tab), route: 'admin_data', params: { tab } }]}
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

                {tab === 'datasets' &&
                  <DatasetTab tab={tab} subtab={subtab} id={id} />
                }

                {tab === 'widgets' &&
                  <WidgetsTab tab={tab} subtab={subtab} id={id} dataset={dataset} />
                }

                {tab === 'layers' &&
                  <LayersTab tab={tab} subtab={subtab} id={id} dataset={dataset} />
                }
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

DataDetail.propTypes = {
  user: PropTypes.object,
  url: PropTypes.object,
  data: PropTypes.object,
  tab: PropTypes.string,
  subtab: PropTypes.string,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(DataDetail);
