import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import PartnersForm from 'components/admin/partners/form/PartnersForm';

class PartnersShow extends React.Component {
  render() {
    const { id, user } = this.props;
    return (
      <div className="c-partners-show">
        <PartnersForm
          id={id}
          authorization={user.token}
          onSubmit={() => Router.pushRoute('admin_partners', { tab: 'partners' })}
        />
      </div>
    );
  }
}

PartnersShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(PartnersShow);
