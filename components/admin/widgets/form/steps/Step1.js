import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS } from 'components/admin/widgets/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Select from 'components/form/SelectInput';
import Code from 'components/form/Code';
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
    console.log(this.state.form);
    // Reset FORM_ELEMENTS
    FORM_ELEMENTS.elements = {};

    return (
      <fieldset className="c-field-container">

        {/* DATASET */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset = c; }}
          onChange={value => this.props.onChange({
            dataset: value
          })}
          className="-fluid"
          options={this.props.datasets}
          properties={{
            name: 'dataset',
            label: 'Dataset',
            default: this.state.form.dataset,
            value: this.state.form.dataset,
            instanceId: 'selectDataset'
          }}
        >
          {Select}
        </Field>

        {/* NAME */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          className="-fluid"
          properties={{
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            default: this.state.form.name
          }}
        >
          {Input}
        </Field>

        {/* SLUG */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.slug = c; }}
          onChange={value => this.props.onChange({ slug: value })}
          validations={['required']}
          className="-fluid"
          properties={{
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: true,
            default: this.state.form.slug
          }}
        >
          {Input}
        </Field>

        {/* QUERY URL */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.queryUrl = c; }}
          onChange={value => this.props.onChange({ queryUrl: value })}
          validations={['url']}
          className="-fluid"
          properties={{
            name: 'queryUrl',
            label: 'Query url',
            type: 'text',
            required: true,
            default: this.state.form.queryUrl
          }}
        >
          {Input}
        </Field>

        {/* DESCRIPTION */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
          onChange={value => this.props.onChange({ description: value })}
          className="-fluid"
          properties={{
            name: 'description',
            label: 'Description',
            default: this.state.form.description
          }}
        >
          {TextArea}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.widgetConfig = c; }}
          onChange={value => this.props.onChange({ widgetConfig: value })}
          properties={{
            name: 'widgetConfig',
            label: 'Widget config',
            type: 'textarea',
            default: this.state.form.widgetConfig
          }}
        >
          {Code}
        </Field>

        {/* PUBLISHED */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
          onChange={value => this.props.onChange({ published: value.checked })}
          properties={{
            name: 'published',
            label: 'Do you want to set this widget as published?',
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
  partners: PropTypes.array,
  datasets: PropTypes.array,
  onChange: PropTypes.func
};

export default Step1;
