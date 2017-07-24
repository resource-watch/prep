import React from 'react';

// Next components
import { Link } from 'routes';

function PartnerTD(props) {
  const { value, index } = props;

  return (
    <td key={index}>
      <Link route="admin_partners_detail" params={{ tab: 'partners', id: value.id }}>
        <a>{value.name}</a>
      </Link>
    </td>
  );
}

PartnerTD.propTypes = {
  value: React.PropTypes.object,
  index: React.PropTypes.string
};

export default PartnerTD;
