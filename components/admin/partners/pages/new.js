import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import PartnersForm from 'components/admin/partners/form/PartnersForm';

class PartnersNew extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <div className="c-partners-new">
        <PartnersForm
          application={[process.env.APPLICATIONS]}
          authorization={user.token}
          onSubmit={() => Router.pushRoute('admin_partners', { tab: 'partners' })}
        />
      </div>
    );
  }
}

PartnersNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(PartnersNew);
