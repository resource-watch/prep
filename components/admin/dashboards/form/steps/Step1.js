import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { FORM_ELEMENTS } from 'components/admin/dashboards/form/constants';

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

        {/* INDICATORS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.indicator_id = c; }}
          onChange={value => this.props.onChange({
            indicator_id: value
          })}
          className="-fluid"
          options={this.props.indicators}
          properties={{
            name: 'indicator_id',
            label: 'Indicator',
            default: this.state.form.indicator_id,
            value: this.state.form.indicator_id,
            instanceId: 'selectIndicator'
          }}
        >
          {Select}
        </Field>

        {/* TOOLS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.tool_ids = c; }}
          onChange={value => this.props.onChange({
            tool_ids: value
          })}
          className="-fluid"
          options={this.props.tools}
          properties={{
            name: 'tool_ids',
            label: 'Tools',
            multi: true,
            default: this.state.form.tool_ids,
            value: this.state.form.tool_ids,
            instanceId: 'selectTools'
          }}
        >
          {Select}
        </Field>

        {/* DASHBOARDS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.dashboard_ids = c; }}
          onChange={value => this.props.onChange({
            dashboard_ids: value
          })}
          className="-fluid"
          options={this.props.dashboards}
          properties={{
            name: 'dashboard_ids',
            label: 'Related dashboards',
            multi: true,
            default: this.state.form.dashboard_ids,
            value: this.state.form.dashboard_ids,
            instanceId: 'selectDashboards'
          }}
        >
          {Select}
        </Field>

        {/* DATASETS */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.related_datasets = c; }}
          onChange={value => this.props.onChange({
            related_datasets: value
          })}
          className="-fluid"
          options={this.props.datasets}
          properties={{
            name: 'related_datasets',
            label: 'Related datasets',
            multi: true,
            default: this.state.form.related_datasets,
            value: this.state.form.related_datasets,
            instanceId: 'selectDatasets'
          }}
        >
          {Select}
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
            instanceId: 'selectPartnerType'
          }}
        >
          {Select}
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

        {/* PUBLISHED */}
        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.published = c; }}
          onChange={value => this.props.onChange({ published: value.checked })}
          properties={{
            name: 'published',
            label: 'Do you want to set this dashboard as published?',
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
  indicators: PropTypes.array,
  tools: PropTypes.array,
  dashboards: PropTypes.array,
  datasets: PropTypes.array,
  onChange: PropTypes.func
};

export default Step1;
