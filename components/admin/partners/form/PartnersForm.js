import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

import { get, post } from 'utils/request';

import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/admin/partners/form/constants';

import Navigation from 'components/form/Navigation';
import Step1 from 'components/admin/partners/form/steps/Step1';
import Spinner from 'components/ui/Spinner';

class PartnersForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, STATE_DEFAULT, {
      partner: props.partner,
      loading: !!props.partner,
      form: Object.assign({}, STATE_DEFAULT.form, {
        authorization: props.authorization
      })
    });

    // BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);
  }

  componentDidMount() {
    // Get the partners and fill the
    // state with its params if it exists

    if (this.state.partners) {
      get({
        url: `${process.env.BACKOFFICE_API_URL}/partners/${this.state.partners}`,
        headers: [{
          key: 'Content-Type',
          value: 'application/json'
        }],
        onSuccess: (response) => {
          this.setState({
            partners: response.data.id,
            form: this.setFormFromParams(response.data.attributes),
            // Stop the loading
            loading: false
          });
        },
        onError: (error) => {
          this.setState({ loading: false });
          console.error(error);
        }
      });
    }
  }

  /**
   * UI EVENTS
   * - onSubmit
   * - onChange
  */
  onSubmit(event) {
    event.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate(this.state.step);

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      // Validate all the inputs on the current step
      const valid = FORM_ELEMENTS.isValid(this.state.step);

      if (valid) {
        // if we are in the last step we will submit the form
        if (this.state.step === this.state.stepLength && !this.state.submitting) {
          const { partner } = this.state;

          // Start the submitting
          this.setState({ submitting: true });

          // Set the request
          const requestOptions = {
            type: (partner) ? 'PATCH' : 'POST',
            omit: ['authorization']
          };

          // Create formData and append all the necessaries keys
          const formData = new FormData();
          Object.keys(omit(this.state.form, requestOptions.omit)).forEach((key) => {
            formData.append(`partner[${key}]`, this.state.form[key]);
          });

          post({
            type: requestOptions.type,
            url: `${process.env.BACKOFFICE_API_URL}/api/partners/${partner || ''}`,
            multipart: true,
            body: formData,
            headers: [],
            onSuccess: (response) => {
              debugger;
              const successMessage = `The partners "${response.data.id}" - "${response.data.attributes.name}" has been uploaded correctly`;
              alert(successMessage);

              this.props.onSubmit && this.props.onSubmit();
            },
            onError: (error) => {
              this.setState({ submitting: false });
              console.error(error);
            }
          });
        } else {
          this.setState({
            step: this.state.step + 1
          }, () => console.info(this.state));
        }
      }
    }, 0);
  }

  onChange(obj) {
    const form = Object.assign({}, this.state.form, obj);
    this.setState({ form }, () => console.info(this.state.form));
  }

  onStepChange(step) {
    this.setState({ step });
  }

  // HELPERS
  setFormFromParams(params) {
    const form = Object.keys(this.state.form);
    const newForm = {};

    form.forEach((f) => {
      if (params[f] || this.state.form[f]) {
        newForm[f] = params[f] || this.state.form[f];
      }
    });

    return newForm;
  }

  render() {
    return (
      <form className="c-form" onSubmit={this.onSubmit} noValidate>
        <Spinner isLoading={this.state.loading} className="-light" />

        {(this.state.step === 1 && !this.state.loading) &&
          <Step1
            onChange={value => this.onChange(value)}
            form={this.state.form}
            partners={this.state.partners}
          />
        }

        {!this.state.loading &&
          <Navigation
            step={this.state.step}
            stepLength={this.state.stepLength}
            submitting={this.state.submitting}
            onStepChange={this.onStepChange}
          />
        }
      </form>
    );
  }
}

PartnersForm.propTypes = {
  authorization: PropTypes.string,
  partner: PropTypes.string,
  onSubmit: PropTypes.func
};

export default PartnersForm;
