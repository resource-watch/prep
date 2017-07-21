import React from 'react';

// Layout
import Page from 'components/admin/layout/Page';
import Layout from 'components/admin/layout/Layout';
import Tabs from 'components/ui/Tabs';

// Tabs
import ToolsTab from 'components/admin/tools/ToolsTab';

// Components
import Title from 'components/ui/Title';

// Contants
const DATA_TABS = [{
  label: 'Tools',
  value: 'tools',
  route: 'admin_tools',
  params: { tab: 'tools' }
}];

class Tools extends Page {

  constructor(props) {
    super(props);

    const { url } = props;

    this.state = {
      tab: url.query.tab || 'tools',
      id: url.query.id,
      subtab: url.query.subtab
    };
  }

  componentWillReceiveProps(nextProps) {
    const { url } = nextProps;

    this.setState({
      tab: url.query.tab || 'tools',
      id: url.query.id,
      subtab: url.query.subtab
    });
  }

  render() {
    const { url, user } = this.props;
    const { tab, subtab, id } = this.state;

    return (
      <Layout
        title="Tools"
        description="Tools description..."
        user={user}
        url={url}
      >
        {/* PAGE HEADER */}
        <div className="c-page-header -admin">
          <div className="l-container">
            <div className="page-header-content -padding-b-0">
              <Title className="-primary -huge page-header-title" >
                Tools
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
            {tab === 'tools' &&
              <ToolsTab tab={tab} subtab={subtab} id={id} />
            }
          </div>
        </div>
      </Layout>
    );
  }
}

Tools.propTypes = {
  user: React.PropTypes.object,
  url: React.PropTypes.object
};


export default Tools;
