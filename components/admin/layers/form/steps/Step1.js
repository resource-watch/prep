import React from 'react';
import PropTypes from 'prop-types';

// Constants
import { PROVIDER_OPTIONS, FORM_ELEMENTS } from 'components/admin/layers/form/constants';

// Redux
import { connect } from 'react-redux';

// Components
import Field from 'components/form/Field';
import Input from 'components/form/Input';
import Select from 'components/form/SelectInput';
import Textarea from 'components/form/TextArea';
import Checkbox from 'components/form/Checkbox';
import Code from 'components/form/Code';

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      form: props.form
    };
  }

  render() {
    const { user } = this.props;
    return (
      <fieldset className="c-field-container">
        {!this.state.id &&
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.dataset = c; }}
            onChange={value => this.props.onChangeDataset(value)}
            validations={['required']}
            options={this.props.datasets}
            properties={{
              name: 'dataset',
              label: 'Dataset',
              type: 'text',
              required: true,
              default: this.state.form.dataset
            }}
          >
            {Select}
          </Field>
        }

        {user.role === 'ADMIN' ?
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.env = c; }}
            hint={'Choose "preproduction" to see this dataset it only as admin, "production" option will show it in public site.'}
            className="-fluid"
            options={[{ label: 'Pre-production', value: 'preproduction' }, { label: 'Production', value: 'production' }]}
            onChange={value => this.props.onChange({ env: value })}
            properties={{
              name: 'env',
              label: 'Environment',
              placeholder: 'Type the columns...',
              noResultsText: 'Please, type the name of the columns and press enter',
              promptTextCreator: label => `The name of the column is "${label}"`,
              default: 'preproduction',
              value: this.props.form.env
            }}
          >
            {Select}
          </Field>
          :
          <Field
            ref={(c) => { if (c) FORM_ELEMENTS.elements.env = c; }}
            hint="Environment"
            className="-fluid"
            options={[{ label: 'Pre-production', value: 'preproduction' }, { label: 'Production', value: 'production' }]}
            properties={{
              name: 'env',
              label: 'Environment',
              hidden: true,
              default: 'preproduction',
              value: this.props.form.env
            }}
          >
            {Input}
          </Field>
        }

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
          onChange={value => this.props.onChange({ name: value })}
          validations={['required']}
          properties={{
            name: 'name',
            label: 'Title',
            type: 'text',
            required: true,
            default: this.state.form.name
          }}
        >
          {Input}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.provider = c; }}
          onChange={value => this.props.onChange({ provider: value })}
          validations={['required']}
          options={PROVIDER_OPTIONS}
          properties={{
            name: 'provider',
            label: 'Provider',
            type: 'text',
            required: true,
            default: this.state.form.provider
          }}
        >
          {Select}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.description = c; }}
          onChange={value => this.props.onChange({ description: value })}
          properties={{
            name: 'description',
            label: 'Description',
            type: 'textarea',
            default: this.state.form.description
          }}
        >
          {Textarea}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.layerConfig = c; }}
          onChange={value => this.props.onChange({ layerConfig: value })}
          properties={{
            name: 'layerConfig',
            label: 'Layer config',
            default: this.state.form.layerConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.legendConfig = c; }}
          onChange={value => this.props.onChange({ legendConfig: value })}
          properties={{
            name: 'legendConfig',
            label: 'Legend config',
            default: this.state.form.legendConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.interactionConfig = c; }}
          onChange={value => this.props.onChange({ interactionConfig: value })}
          properties={{
            name: 'interactionConfig',
            label: 'Interaction config',
            default: this.state.form.interactionConfig
          }}
        >
          {Code}
        </Field>

        <Field
          ref={(c) => { if (c) FORM_ELEMENTS.elements.default = c; }}
          onChange={value => this.props.onChange({ default: value.checked })}
          option={{ label: 'Default' }}
          properties={{
            name: 'default',
            label: 'Do you want to set this layer as the default one. (Only one default layer per dataset is allowed at a time)',
            value: 'default',
            title: 'Default',
            checked: this.props.form.default
          }}
        >
          {Checkbox}
        </Field>


      </fieldset>
    );
  }
}

Step1.defaultPropTypes = {
  datasets: []
};

Step1.propTypes = {
  id: PropTypes.string,
  datasets: PropTypes.array,
  form: PropTypes.object,
  onChange: PropTypes.func,
  onChangeDataset: PropTypes.func,

  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Step1);
