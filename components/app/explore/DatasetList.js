import React from 'react';
import find from 'lodash/find';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Components
import DatasetWidget from 'components/app/explore/DatasetWidget';

const DatasetList = (props) => {
  const { active, list, mode, showActions } = props;

  const newClassName = classNames({
    column: true,
    'list-item': true,
    'small-12': true,
    'medium-4': mode === 'grid',
    [`-${mode}`]: true
  });

  return (
    <div className="c-dataset-list">
      <div className="list row">
        {list.map(dataset =>
          (<div className={newClassName} key={dataset.id}>
            <DatasetWidget
              active={active.includes(dataset.id)}
              dataset={dataset}
              widget={find(dataset.attributes.widget, { attributes: { default: true } })}
              layer={find(dataset.attributes.layer, { attributes: { default: true } })}
              mode={mode}
              showActions={showActions}
            />
          </div>)
        )}
      </div>
    </div>
  );
};

DatasetList.propTypes = {
  list: PropTypes.array,
  active: PropTypes.array,
  mode: PropTypes.string,
  showActions: PropTypes.bool.isRequired
};

export default DatasetList;
