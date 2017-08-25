import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';

// Components
import PartnersForm from 'components/admin/partners/form/PartnersForm';

function PartnersNew(props) {
  const { user } = props;

  return (
    <div className="c-partners-new">
      <PartnersForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_resources', { tab: 'partners' })}
      />
    </div>
  );
}

PartnersNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(PartnersNew);
