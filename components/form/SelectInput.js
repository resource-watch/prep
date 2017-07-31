import React from 'react';
import PropTypes from 'prop-types';
import Select, { Creatable } from 'react-select';
import FormElement from './FormElement';

class SelectInput extends FormElement {

  constructor(props) {
    super(props);
    const defaultValue = props.properties.default;

    this.state = {
      value: (typeof defaultValue !== 'undefined' || defaultValue !== null) ? defaultValue : null
    };
  }

  /**
   * UI EVENTS
   * - triggerChange
  */
  triggerChange(selected) {
    let value;

    if (Array.isArray(selected)) {
      value = (selected) ? selected.map(s => s.value) : null;
    } else {
      value = (selected) ? selected.value : null;
    }

    this.setState({ value }, () => {
      // Trigger validation
      this.triggerValidate();
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
    });
  }

  render() {
    const { options, properties } = this.props;

    if (properties.creatable) {
      return (
        <Creatable
          {...properties}
          options={options}
          id={`select-${properties.name}`}
          value={this.state.value}
          onChange={this.triggerChange}
        />
      );
    }
    return (
      <Select
        {...properties}
        options={options}
        id={`select-${properties.name}`}
        value={this.state.value}
        onChange={this.triggerChange}
      />
    );
  }
}

SelectInput.defaultProps = {
  options: []
};

SelectInput.propTypes = {
  properties: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  creatable: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any
};

export default SelectInput;
