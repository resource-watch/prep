import React from 'react';

// Services
import UsersService from 'services/UsersService';

// Components
import Button from 'components/ui/Button';
import Checkbox from 'components/form/Checkbox';
import Field from 'components/form/Field';
import Input from 'components/form/Input';


export const FORM_ELEMENTS = {
  elements: {
  },
  validate() {
    const elements = this.elements;
    Object.keys(elements).forEach((k) => {
      elements[k].validate();
    });
  },
  isValid() {
    const elements = this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};


class MyRWEditProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }

  triggerSaveProfile() {

  }

  handleFormChange(value) {
    this.setState(Object.assign(this.state, value));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="c-myrw-profile-edit">
        <div className="row">
          <div className="column small-12">
            <div className="title-section">
              <h1>Edit Profile</h1>
              <Button
                properties={{
                  type: 'button',
                  className: '-primary -end'
                }}
                onClick={this.triggerSaveProfile}
              >
                Save
              </Button>
            </div>
            <fieldset className="c-field-container">
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.name = c; }}
                onChange={value => this.handleFormChange({ name: value })}
                validations={['required']}
                properties={{
                  name: 'name',
                  label: 'Name',
                  type: 'text',
                  required: true,
                  default: user.name
                }}
              >
                {Input}
              </Field>
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.email = c; }}
                onChange={value => this.handleFormChange({ email: value })}
                validations={['required']}
                properties={{
                  name: 'email',
                  label: 'Email',
                  type: 'email',
                  required: true,
                  default: user.email
                }}
              >
                {Input}
              </Field>
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.new_password = c; }}
                onChange={value => this.handleFormChange({ new_password: value })}
                properties={{
                  name: 'new_password',
                  label: 'Change password',
                  type: 'password',
                  default: user.new_password
                }}
              >
                {Input}
              </Field>
            </fieldset>
            <h5>Photo</h5>
            <div className="photo-container">
              Add
            </div>
            <div className="bottom-section">
              <div className="delete-account-checkbox">
                <Field
                  ref={(c) => { if (c) FORM_ELEMENTS.elements.wri_funded = c; }}
                  onChange={value => this.changeMetadata({ deleteAccount: value.checked })}
                  properties={{
                    name: 'delete_account',
                    label: 'Delete account',
                    checked: false,

                  }}
                >
                  {Checkbox}
                </Field>
              </div>
              <Button
                properties={{
                  type: 'button',
                  className: '-primary -end'
                }}
                onClick={this.triggerSaveProfile}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyRWEditProfile;
