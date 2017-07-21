import React from 'react';
import PropTypes from 'prop-types';

// Services
import ToolsService from 'services/ToolsService';
import PartnersService from 'services/PartnersService';

import { STATE_DEFAULT, FORM_ELEMENTS } from 'components/admin/tools/form/constants';

import Navigation from 'components/form/Navigation';
import Step1 from 'components/admin/tools/form/steps/Step1';
import Spinner from 'components/ui/Spinner';

class ToolsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, STATE_DEFAULT, {
      id: props.id,
      loading: !!props.id,
      form: STATE_DEFAULT.form
    });

    // BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStepChange = this.onStepChange.bind(this);

    this.service = new ToolsService({
      authorization: props.authorization
    });
    this.partnersService = new PartnersService({
      authorization: props.authorization
    });
  }

  componentDidMount() {
    const { id } = this.state;

    this.partnersService.fetchAllData()
      .then((partners) => {
        this.setState({
          partners: partners.map(p => ({ label: p.name, value: p.id }))
        });

        if (id) {
          // Get the tools and fill the
          // state form with its params if the id exists
          this.service.fetchData(id)
            .then((data) => {
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
      })
      .catch((err) => {
        console.error(err);
      });
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

          // Save data
          this.service.saveData({
            id: id || '',
            type: (id) ? 'PATCH' : 'POST',
            body: this.state.form
          })
            .then((data) => {
              const successMessage = `The tools "${data.id}" - "${data.title}" has been uploaded correctly`;
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
            id={this.state.id}
            form={this.state.form}
            partners={this.state.partners}
            onChange={value => this.onChange(value)}
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

ToolsForm.propTypes = {
  authorization: PropTypes.string,
  id: PropTypes.string,
  onSubmit: PropTypes.func
};

export default ToolsForm;
