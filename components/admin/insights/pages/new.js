import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import InsightsForm from 'components/admin/insights/form/InsightsForm';

function InsightsNew(props) {
  const { user } = props;

  return (
    <div className="c-insights-new">
      <InsightsForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_insights', { tab: 'insights' })}
      />
    </div>
  );
}

InsightsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(InsightsNew);
