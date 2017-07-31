import React from 'react';
import PropTypes from 'prop-types';

// Components
import IndicatorsTable from 'components/admin/indicators/table/IndicatorsTable';

export default function IndicatorsIndex(props) {
  const { user } = props;

  return (
    <div className="c-indicators-index">
      <IndicatorsTable
        application={[process.env.APPLICATIONS]}
        authorization={user.token}
      />
    </div>
  );
}

IndicatorsIndex.propTypes = {
  user: PropTypes.object.isRequired
};

IndicatorsIndex.defaultProps = {
  user: {}
};
