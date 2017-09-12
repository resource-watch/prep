import React from 'react';
import PropTypes from 'prop-types';
import { singular } from 'pluralize';
import { toastr } from 'react-redux-toastr';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Utils
import { capitalizeFirstLetter } from 'utils/utils';

// Services
import DatasetsService from 'services/DatasetsService';
import WidgetsService from 'services/WidgetsService';
import LayersService from 'services/LayersService';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Breadcrumbs from 'components/ui/Breadcrumbs';

// Tabs
import DatasetsTab from 'components/admin/datasets/DatasetsTab';
import WidgetsTab from 'components/admin/widgets/WidgetsTab';
import LayersTab from 'components/admin/layers/LayersTab';

class DataDetail extends Page {
  constructor(props) {
    super(props);

    const { tab, id, subtab, dataset } = props.url.query;

    this.state = {
      tab,
      id,
      subtab,
      data: {},
      dataset
    };

    this.service = null;

    switch (tab) {
      case 'datasets':
        if (id !== 'new') {
          this.service = new DatasetsService();
        }
        break;

      case 'widgets':
        if (id !== 'new') {
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
  }

  componentDidMount() {
    const { id } = this.state;

    if (this.service) {
      // Fetch the dataset / layer / widget depending on the tab
      this.service.fetchData({ id })
        .then((data) => {
          this.setState({ data });
        })
        .catch((err) => {
          toastr.error('Error', err);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tab, id, subtab, dataset } = nextProps.url.query;

    this.setState({ tab, id, subtab, dataset });
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

    if (data.name) {
      return data.name;
    }

    return '-';
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id, dataset } = this.state;

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
              <div className="column small-12">
                <div className="page-header-content">
                  <Breadcrumbs
                    items={[{ name: capitalizeFirstLetter(tab), route: 'admin_data', params: { tab } }]}
                  />
                  <h1>{this.getName()}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="c-page-section">
          <div className="l-container">
            <div className="row">
              <div className="column small-12">
                {tab === 'datasets' &&
                  <DatasetsTab tab={tab} subtab={subtab} id={id} />
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
  url: PropTypes.object
};


export default withRedux(initStore, null, null)(DataDetail);
