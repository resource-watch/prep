import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { setCategory } from 'redactions/widgetEditor';
import ColumnBox from 'components/widgets/ColumnBox';

const boxTarget = {
  drop(props, monitor) {
    props.setCategory(monitor.getItem());
  }
};

@DropTarget('columnbox', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class CategoryContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      category: null
    };
  }


  render() {
    const { canDrop, isOver, connectDropTarget, widgetEditor } = this.props;
    const isActive = canDrop && isOver;
    const { category } = widgetEditor;

    const containerDivClass = classNames({
      'c-column-container': true,
      '-release': isActive
    });

    return connectDropTarget(
      <div className={containerDivClass}>
        Category
        {category &&
          <ColumnBox
            name={category.name}
            type={category.type}
            closable
            configurable={category.type === 'number'}
            isA="category"
          />
        }
      </div>
    );
  }
}

CategoryContainer.propTypes = {
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  widgetEditor: PropTypes.object
};

const mapStateToProps = state => ({
  widgetEditor: state.widgetEditor
});

const mapDispatchToProps = dispatch => ({
  setCategory: (category) => {
    dispatch(setCategory(category));
  }
});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(CategoryContainer);
