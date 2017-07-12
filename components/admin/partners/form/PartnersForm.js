import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

// Services
import PartnersService from 'services/PartnersService';

import { post } from 'utils/request';

import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/admin/partners/form/constants';

import Navigation from 'components/form/Navigation';
import Step1 from 'components/admin/partners/form/steps/Step1';
import Spinner from 'components/ui/Spinner';

class PartnersForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, STATE_DEFAULT, {
      id: props.id,
      loading: !!props.id,
      form: Object.assign({}, STATE_DEFAULT.form, {
        authorization: props.authorization
      })
    });

    // BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.service = new PartnersService(props.id, {
      apiURL: process.env.BACKOFFICE_API_URL
    });
  }

  componentDidMount() {
    // Get the partners and fill the
    // state with its params if it exists

    if (this.state.id) {
      this.service.fetchData()
        .then((data) => {
          console.log(data);
          this.setState({
            form: this.setFormFromParams(data),
            // Stop the loading
            loading: false
          });
        })
        .catch((err) => {
          console.error(err);
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
          const { id } = this.state;

          // Start the submitting
          this.setState({ submitting: true });

          this.service.saveData({
            id: id || '',
            type: (id) ? 'PATCH' : 'POST',
            body: omit(this.state.form, ['authorization'])
          })
            .then((data) => {
              const successMessage = `The partners "${data.id}" - "${data.name}" has been uploaded correctly`;
              alert(successMessage);

              if (this.props.onSubmit) this.props.onSubmit();
            })
            .catch((err) => {
              this.setState({ submitting: false });
              console.error(err);
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
            id={this.state.id}
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
  id: PropTypes.string,
  onSubmit: PropTypes.func
};

export default PartnersForm;
