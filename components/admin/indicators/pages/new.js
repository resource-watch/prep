import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import IndicatorsForm from 'components/admin/indicators/form/IndicatorsForm';

function IndicatorsNew(props) {
  const { user } = props;

  return (
    <div className="c-indicators-new">
      <IndicatorsForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_dashboards', { tab: 'indicators' })}
      />
    </div>
  );
}

IndicatorsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(IndicatorsNew);
