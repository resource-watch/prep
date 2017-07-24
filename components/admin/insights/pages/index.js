import React from 'react';
import PropTypes from 'prop-types';

// Components
import InsightsTable from 'components/admin/insights/table/InsightsTable';

export default function InsightsIndex(props) {
  const { user } = props;

  return (
    <div className="c-insights-index">
      <InsightsTable
        application={[process.env.APPLICATIONS]}
        authorization={user.token}
      />
    </div>
  );
}

InsightsIndex.propTypes = {
  user: PropTypes.object.isRequired
};

InsightsIndex.defaultProps = {
  user: {}
};
