import React from 'react';
import { singular } from 'pluralize';

// Services
import PartnersService from 'services/PartnersService';

// Utils
import { capitalizeFirstLetter } from 'utils/utils';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';

// Tabs
import PartnersTab from 'components/admin/partners/PartnersTab';
import Breadcrumbs from 'components/ui/Breadcrumbs';

// Components
import Title from 'components/ui/Title';

class Partners extends Page {

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
      case 'partners':
        if (id !== 'new') {
          this.service = new PartnersService(id, {
            apiURL: process.env.BACKOFFICE_API_URL
          });
        }
        break;
      // TODO: do the same service for widgets and layers
      default:

    }
  }

  componentWillMount() {
    if (this.service) {
      // Fetch the dataset / layer / widget depending on the tab
      this.service.fetchData()
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
        description="Partners detail..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="page-header-content">
              <Breadcrumbs
                items={[{ name: capitalizeFirstLetter(tab), route: 'admin_partners', params: { tab } }]}
              />
              <Title className="-primary -huge page-header-title" >
                {this.getName()}
              </Title>
            </div>
          </div>
        </div>
        <div className="c-page-section">
          <div className="l-container">
            {tab === 'partners' &&
              <PartnersTab tab={tab} subtab={subtab} id={id} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

Partners.propTypes = {
  user: React.PropTypes.object,
  url: React.PropTypes.object
};


export default Partners;
