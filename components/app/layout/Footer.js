import React from 'react';
import { Link } from 'routes';
import CompoundMenu from 'components/ui/CompoundMenu';
import Carousel from 'components/ui/Carousel';
import { getPartners } from 'redactions/admin/partners';
import { initStore } from 'store';
import withRedux from 'next-redux-wrapper';

const data = [
  { name: 'Data' },
  { name: 'Explore Datasets', route: 'explore' },
  { name: 'Dashboards', route: 'dashboards' },
  { name: 'Planet Pulse', route: 'pulse' }
];

const about = [
  { name: 'About', route: 'about' },
  { name: 'Partners', route: 'about_partners' }
];

const insights = [
  { name: 'Insights', route: 'insights' },
  { name: 'Recent insights' },
  { name: 'Highlighted insights' }
];

const getInvolved = [
  { name: 'Get involved', route: 'get_involved' },
  { name: 'Submit an insight', route: 'get_involved_detail', params: { id: 'submit-an-insight' } },
  { name: 'Contribute data', route: 'get_involved_detail', params: { id: 'contribute-data' } },
  { name: 'Join the community', route: 'get_involved_detail', params: { id: 'join-community' } }
];

class Footer extends React.Component {

  componentWillMount() {
    this.props.getPartners();
  }

  setPartnersList() {
    const featured = this.props.list.filter(p => p.attributes.featured);

    return featured.map(p => (
      <div key={p.id} className="item">
        <Link route="partner" params={{ id: p.id }}>
          <a>
            <img className="-img" src={`${process.env.BACKOFFICE_API_URL}${p.attributes.logo.thumb}`} alt={p.attributes.name} />
          </a>
        </Link>
      </div>
    ));
  }

  render() {
    const menuData = [data, about, insights, getInvolved];
    const items = this.setPartnersList();

    return (
      <footer className="c-footer">
        <div className="footer-intro">
          <h1 className="title"><Link to="/about/partners"><a>Partners</a></Link></h1>
          <div className="partners row">
            <div className="column small-12">
              {items.length ? <Carousel items={items} /> : ''}
            </div>
          </div>
        </div>

        <div className="footer-main">
          <CompoundMenu items={menuData} />
        </div>

        <div className="footer-terms">
          <div className="terms row">
            <div className="column small-12">
              <p>Terms of Service — Privacy</p>
              <p>© 2017 - Resource Watch</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  getPartners: React.PropTypes.func,
  list: React.PropTypes.array
};

const mapStateToProps = state => ({
  list: state.partners.list
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => { dispatch(getPartners()); }
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Footer);
