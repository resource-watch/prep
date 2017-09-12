import React from 'react';

import { FORM_ELEMENTS, LANGUAGE_OPTIONS } from 'components/admin/metadata/form/constants';

import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Select from 'components/form/SelectInput';
import TextArea from 'components/form/TextArea';
import Title from 'components/ui/Title';

class Step1 extends React.Component {
  changeMetadata(obj) {
    const { form } = this.props;
    let newMetadata;

    if (obj.info) {
      const info = { ...form.info, ...obj.info };
      newMetadata = { ...form, ...{ info } };
    } else {
      newMetadata = { ...form, ...obj };
    }

    this.props.onChange({ form: newMetadata });
  }

  render() {
    return (
      <div>
        <fieldset className="c-field-container">
          <Title className="-big -secondary">
            Edit metadata
          </Title>

          <Title className="-default -secondary">
            General
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
            onChange={value => this.changeMetadata({ name: value })}
            validations={['required']}
            hint="Max length of 75 characters"
            properties={{
              name: 'name',
              label: 'Title',
              type: 'text',
              maxLength: '75',
              required: true,
              default: this.props.form.name
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.subtitle = c; }}
            onChange={value => this.changeMetadata({ info: { subtitle: value } })}
            properties={{
              name: 'subtitle',
              label: 'Subtitle',
              type: 'text',
              default: this.props.form.info.subtitle
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
            onChange={(value) => {
              this.changeMetadata({ description: value });
              this.changeMetadata({ info: { description: value } });
            }}
            validations={['required']}
            properties={{
              name: 'description',
              label: 'Description',
              rows: '6',
              required: true,
              default: this.props.form.info.description
            }}
          >
            {TextArea}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements['short-description'] = c; }}
            onChange={value => this.changeMetadata({ info: { 'short-description': value } })}
            properties={{
              name: 'short-description',
              label: 'Short description',
              type: 'text',
              rows: '6',
              default: this.props.form.info['short-description']
            }}
          >
            {TextArea}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements['organization-long'] = c; }}
            onChange={value => this.changeMetadata({ info: { 'organization-long': value } })}
            properties={{
              name: 'organization-long',
              label: 'Organization (long name)',
              type: 'text',
              default: this.props.form.info['organization-long']
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.organization = c; }}
            onChange={value => this.changeMetadata({ info: { organization: value } })}
            properties={{
              name: 'organization',
              label: 'Organization (short name)',
              type: 'text',
              default: this.props.form.info.organization
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.language = c; }}
            onChange={value => this.changeMetadata({ language: value })}
            validations={['required']}
            options={LANGUAGE_OPTIONS}
            properties={{
              name: 'language',
              label: 'Data language',
              type: 'text',
              disabled: true,
              required: true,
              default: this.props.form.language || 'en',
              instanceId: 'selectLanguage'
            }}
          >
            {Select}
          </Field>

        </fieldset>

        <fieldset className="c-field-container">
          <Title className="-default -secondary">
            Data info
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.citation = c; }}
            onChange={value => this.changeMetadata({ info: { citation: value } })}
            hint="Unless otherwise specified on Data Sharing Agreement, format should be: Organization name. “Official data layer name as in the ODP.” Accessed through Resource Watch [date]. www.resourcewatch.org (should always end with: Accessed through Resource Watch on [date]. www.resourcewatch.org)"
            properties={{
              name: 'citation',
              label: 'Citation',
              type: 'text',
              rows: '6',
              default: this.props.form.info.citation
            }}
          >
            {TextArea}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.license = c; }}
            onChange={value => this.changeMetadata({ info: { license: value } })}
            hint="License under which data are published"
            properties={{
              name: 'license',
              label: 'License',
              type: 'text',
              default: this.props.form.info.license
            }}
          >
            {Input}
          </Field>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.license_link = c; }}
            onChange={value => this.changeMetadata({ info: { license_link: value } })}
            validations={['url']}
            properties={{
              name: 'license_link',
              label: 'License link',
              type: 'text',
              default: this.props.form.info.license_link
            }}
          >
            {Input}
          </Field>
        </fieldset>

        <fieldset className="c-field-container">
          <Title className="-default -secondary">
            Links
          </Title>

          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.dataDownload = c; }}
            onChange={value => this.changeMetadata({ info: { dataDownload: value } })}
            validations={['url']}
            properties={{
              name: 'dataDownload',
              label: 'Data Download link',
              type: 'text',
              default: this.props.form.info.dataDownload
            }}
          >
            {Input}
          </Field>
        </fieldset>
      </div>
    );
  }
}

Step1.propTypes = {
  form: React.PropTypes.object,
  onChange: React.PropTypes.func
};

export default Step1;
