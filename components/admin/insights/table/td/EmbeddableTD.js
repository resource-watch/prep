import React from 'react';
import PropTypes from 'prop-types';

function EmbeddableTD(props) {
  const { value, index } = props;

  return (
    <td className="boolean" key={index}>
      {(value) ? <span className="-true">Yes</span> : <span className="-false">No</span> }
    </td>
  );
}

EmbeddableTD.propTypes = {
  value: PropTypes.bool,
  index: PropTypes.string
};

export default EmbeddableTD;
