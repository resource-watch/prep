import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';

// Components
import IndicatorsForm from 'components/admin/indicators/form/IndicatorsForm';

function IndicatorsShow(props) {
  const { id, user } = props;

  return (
    <div className="c-indicators-show">
      <IndicatorsForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_dashboards', { tab: 'indicators' })}
      />
    </div>
  );
}

IndicatorsShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(IndicatorsShow);
