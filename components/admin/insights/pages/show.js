import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';

// Components
import InsightsForm from 'components/admin/insights/form/InsightsForm';

function InsightsShow(props) {
  const { id, user } = props;

  return (
    <div className="c-insights-show">
      <InsightsForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_insights', { tab: 'insights' })}
      />
    </div>
  );
}

InsightsShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(InsightsShow);
