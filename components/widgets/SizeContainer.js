import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setSize } from 'redactions/widgetEditor';
import ColumnBox from 'components/widgets/ColumnBox';

const boxTarget = {
  drop(props, monitor) {
    const newSize = Object.assign(
      {},
      monitor.getItem(),
      { aggregateFunction: 'none' }
    );
    props.setSize(newSize);
  }
};

@DropTarget('columnbox', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class SizeContainer extends React.Component {

  setAggregateFunction(value) {
    const newSize = Object.assign(
      {},
      this.props.widgetEditor.size,
      { aggregateFunction: value }
    );
    this.props.setSize(newSize);
  }

  render() {
    const { canDrop, isOver, connectDropTarget, widgetEditor } = this.props;
    const isActive = canDrop && isOver;
    const size = widgetEditor.size;

    const containerDivClass = classNames({
      'c-column-container': true,
      '-release': isActive
    });

    return connectDropTarget(
      <div className={containerDivClass}>
        Size
        {size &&
          <ColumnBox
            name={size.name}
            type={size.type}
            closable
            configurable
            onConfigure={aggregateFunction => this.setAggregateFunction(aggregateFunction)}
            isA="size"
          />
        }
      </div>
    );
  }
}

SizeContainer.propTypes = {
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  // Store
  widgetEditor: PropTypes.object.isRequired,
  setSize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  widgetEditor: state.widgetEditor
});

const mapDispatchToProps = dispatch => ({
  setSize: (size) => {
    dispatch(setSize(size));
  }
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(SizeContainer);
