import React from 'react';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { getStaticData } from 'redactions/static_pages';

// Next components
import { Link } from 'routes';

// Components
import Page from 'components/app/layout/Page';
import Layout from 'components/app/layout/Layout';
import Intro from 'components/app/common/Intro';
import Banner from 'components/app/common/Banner';

class About extends Page {
  componentDidMount() {
    super.componentDidMount();
    this.props.getStaticData('about');
  }

  render() {
    const { data } = this.props;
    const styles = {};
    if (data && data.photo) {
      styles.backgroundImage = `url(${process.env.CMS_API_URL}${data.photo.large})`;
    }

    return (
      <Layout
        title="About"
        description="About description..."
        url={this.props.url}
        user={this.props.user}
      >
        <div className="p-about">
          <div className="c-page">
            <Intro title={data && data.title} intro={data && data.summary} styles={styles} />
            <section className="l-section">
              <div className="l-container">
                <div className="row collapse">
                  {/* Convert string content to html */}
                  <div
                    className="description column small-12 medium-8 medium-offset-2"
                    dangerouslySetInnerHTML={{ __html: data && data.description }}
                  />
                </div>
              </div>
            </section>

            <div className="row collapse">
              <div className="column small-12">
                <Banner className="partners">
                  <h3 className="c-text -header-normal -normal">We have a massive opportunity<br />to build a sustainable society</h3>
                  <button className="c-btn -primary -filled">
                    <Link href="about_partners"><a>Partners list</a></Link>
                  </button>
                </Banner>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

About.propTypes = {
  // ROUTER
  url: React.PropTypes.object,

  // STORE
  data: React.PropTypes.object,
  getStaticData: React.PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  getStaticData: (slug, ref) => {
    dispatch(getStaticData(slug, ref));
  }
});

export default withRedux(initStore, null, mapDispatchToProps)(About)
