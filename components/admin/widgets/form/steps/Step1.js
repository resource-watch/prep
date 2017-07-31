import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS } from 'components/admin/widgets/form/constants';

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

        {/* DATASETS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset_id = c; }}
          onChange={value => this.props.onChange({
            dataset_id: value
          })}
          className="-fluid"
          options={this.props.datasets}
          properties={{
            name: 'dataset_id',
            label: 'Dataset',
            default: this.state.form.dataset_id,
            value: this.state.form.dataset_id,
            instanceId: 'selectDatasetId'
          }}
        >
          {Select}
        </Field>

        {/* TITLE */}
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

        {/* ATTRIBUTION */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.attribution = c; }}
          onChange={value => this.props.onChange({ attribution: value })}
          className="-fluid"
          properties={{
            name: 'attribution',
            label: 'Attribution',
            type: 'text',
            default: this.state.form.attribution
          }}
        >
          {Input}
        </Field>


        {/* CONTENT URL */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.data_url = c; }}
          onChange={value => this.props.onChange({ data_url: value })}
          validations={['url']}
          className="-fluid"
          properties={{
            name: 'data_url',
            label: 'Data url',
            default: this.state.form.data_url
          }}
        >
          {Input}
        </Field>

        {/* PARTNER */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.partner_id = c; }}
          onChange={value => this.props.onChange({
            partner_id: value
          })}
          className="-fluid"
          options={this.props.partners}
          properties={{
            name: 'partner_id',
            label: 'Partner',
            default: this.state.form.partner_id,
            value: this.state.form.partner_id,
            instanceId: 'selectPartnerId'
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
