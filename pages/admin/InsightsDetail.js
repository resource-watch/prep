import React from 'react';
import { singular } from 'pluralize';

// Services
import InsightsService from 'services/InsightsService';

// Utils
import { capitalizeFirstLetter } from 'utils/utils';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';

// Tabs
import InsightsTab from 'components/admin/insights/InsightsTab';

// Components
import Title from 'components/ui/Title';
import Breadcrumbs from 'components/ui/Breadcrumbs';

class Insights extends Page {

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
      case 'insights':
        if (id !== 'new') {
          this.service = new InsightsService({
            authorization: props.user.token
          });
        }
        break;
      // TODO: do the same service for widgets and layers
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

    if (data.name) {
      return data.name;
    }

    return '-';
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title={this.getName()}
        description="Insights detail..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="page-header-content">
              <Breadcrumbs
                items={[{ name: capitalizeFirstLetter(tab), route: 'admin_insights', params: { tab } }]}
              />
              <Title className="-primary -huge page-header-title" >
                {this.getName()}
              </Title>
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            {tab === 'insights' &&
              <InsightsTab tab={tab} subtab={subtab} id={id} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

Insights.propTypes = {
  user: React.PropTypes.object,
  url: React.PropTypes.object
};


export default Insights;
