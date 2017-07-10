import React from 'react';

class WidgetCard extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.triggerClick = this.triggerClick.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerClick
  */

  triggerClick(e) {
    const widgetId = e.currentTarget.dataset.id;
    if (this.props.onClick) this.props.onClick(widgetId);
  }

  render() {
    const { widget, properties } = this.props;
    return (
      <div
        {...properties}
        className={`c-widgets-card ${properties.className || ''}`}
        onClick={this.triggerClick}
      >
        <div className="header">
          <h3>{widget.name}</h3>
        </div>
      </div>
    );
  }
}

WidgetCard.propTypes = {
  widget: React.PropTypes.object,
  properties: React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default WidgetCard;
