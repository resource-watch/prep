import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS, TEMPLATE_TYPES } from 'components/admin/insights/form/constants';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Select from 'components/form/SelectInput';
import Checkbox from 'components/form/Checkbox';
import FileImage from 'components/form/FileImage';

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

        {/* TEMPLATE TYPE */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.template_type = c; }}
          onChange={value => this.props.onChange({
            template_type: value
          })}
          validations={['required']}
          className="-fluid"
          options={TEMPLATE_TYPES}
          properties={{
            name: 'template_type',
            label: 'Template type',
            required: true,
            default: this.state.form.template_type,
            value: this.state.form.template_type,
            instanceId: 'selectInsightType'
          }}
        >
          {Select}
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

        {/* IMAGE */}
        <div className="c-field-row">
          <div className="row l-row">
            <div className="column small-12 medium-4">
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.image = c; }}
                onChange={(value) => {
                  this.props.onChange({ image: value });
                }}
                className="-fluid"
                properties={{
                  name: 'image',
                  label: 'Image',
                  placeholder: 'Browse file',
                  default: this.state.form.image
                }}
              >
                {FileImage}
              </Field>
            </div>
          </div>
        </div>

        {/* CONTENT URL */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.content_url = c; }}
          onChange={value => this.props.onChange({ content_url: value })}
          validations={['url']}
          className="-fluid"
          properties={{
            name: 'content_url',
            label: 'Content url',
            default: this.state.form.content_url
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
            label: 'Do you want to set this insight as published?',
            value: 'published',
            title: 'Published',
            defaultChecked: this.props.form.published,
            checked: this.props.form.published
          }}
        >
          {Checkbox}
        </Field>

        {/* EMBEDDABLE */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.embeddable = c; }}
          onChange={value => this.props.onChange({ embeddable: value.checked })}
          properties={{
            name: 'embeddable',
            label: 'Do you want to set this insight as embeddable?',
            value: 'embeddable',
            title: 'Embeddable',
            defaultChecked: this.props.form.embeddable,
            checked: this.props.form.embeddable
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
  onChange: PropTypes.func
};

export default Step1;
