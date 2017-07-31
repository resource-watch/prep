import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS } from 'components/admin/indicators/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      form: props.form
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ form: nextProps.form });
  }

  render() {
    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    return (
      <fieldset className="c-field-container">
        {/* NAME */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.title = c; }}
          onChange={value => this.props.onChange({ title: value })}
          validations={['required']}
          className="-fluid"
          properties={{
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.state.form.title
          }}
        >
          {Input}
        </Field>

        {/* SUMMARY */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.summary = c; }}
          onChange={value => this.props.onChange({ summary: value })}
          className="-fluid"
          properties={{
            name: 'summary',
            label: 'Summary',
            default: this.state.form.summary
          }}
        >
          {TextArea}
        </Field>

        {/* CONTENT */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.content = c; }}
          onChange={value => this.props.onChange({ content: value })}
          className="-fluid"
          properties={{
            name: 'content',
            label: 'Content',
            default: this.state.form.content
          }}
        >
          {TextArea}
        </Field>

        {/* PARTNER */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.widget_ids = c; }}
          onChange={value => this.props.onChange({
            partner_id: value
          })}
          className="-fluid"
          options={this.props.widgets}
          properties={{
            name: 'widget_ids',
            label: 'Widgets',
            multi: true,
            default: this.state.form.widget_ids,
            value: this.state.form.widget_ids,
            instanceId: 'selectIndicatorType'
          }}
        >
          {Select}
        </Field>

        {/* PUBLISHED */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
          onChange={value => this.props.onChange({ published: value.checked })}
          properties={{
            name: 'published',
            label: 'Do you want to set this indicator as published?',
            value: 'published',
            title: 'Published',
            defaultChecked: this.props.form.published,
            checked: this.props.form.published
          }}
        >
          {Checkbox}
        </Field>

      </fieldset>
    );
  }
}

Step1.propTypes = {
  id: PropTypes.string,
  form: PropTypes.object,
  widgets: PropTypes.array,
  onChange: PropTypes.func
};

export default Step1;
