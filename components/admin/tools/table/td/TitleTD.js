import React from 'react';

// Next components
import { Link } from 'routes';

function NameTD(props) {
  const { row, value, index } = props;

  return (
    <td key={index} className="main">
      <Link route="admin_tools_detail" params={{ tab: 'tools', id: row.id }}>
        <a>{value}</a>
      </Link>
    </td>
  );
}

NameTD.propTypes = {
  row: React.PropTypes.object,
  value: React.PropTypes.string,
  index: React.PropTypes.string
};

export default NameTD;
