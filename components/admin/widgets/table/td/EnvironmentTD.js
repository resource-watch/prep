import React from 'react';

// Next components
import { Link } from 'routes';

function EnvironmentTD(props) {
  const { row, value, index } = props;

  return (
    <td key={index} className="main">
      {value}
    </td>
  );
}

EnvironmentTD.propTypes = {
  row: React.PropTypes.object,
  value: React.PropTypes.string,
  index: React.PropTypes.string
};

export default EnvironmentTD;
