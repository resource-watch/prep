import React from 'react';


// Components
import Dropzone from 'react-dropzone';
import Icon from 'components/ui/Icon';

import FormElement from './FormElement';

class FileImage extends FormElement {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false
    };

    // BINDINGS
    this.triggerBrowseOrCancel = this.triggerBrowseOrCancel.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * DROPZONE EVENTS
   * - onDragEnter
   * - onDragLeave
   * - onDrop
  */
  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(accepted, rejected) {
    this.setState({
      value: accepted[0],
      accepted,
      rejected,
      dropzoneActive: false
    }, () => {
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
      // Trigger validation
      this.triggerValidate();
      console.log(this.state.accepted);
    });
  }

  /**
   * UI EVENTS
   * - triggerBrowseOrCancel
   * - triggerChange
  */
  triggerBrowseOrCancel() {
    const { accepted } = this.state;
    if (accepted.length) {
      this.setState({
        accepted: [],
        value: ''
      }, () => {
        // Publish the new value to the form
        if (this.props.onChange) this.props.onChange(this.state.value);
        // Trigger validation
        this.triggerValidate();
      });
    } else {
      this.dropzone.open();
    }
  }

  triggerChange(e) {
    this.setState({
      value: e.currentTarget.value
    }, () => {
      // Publish the new value to the form
      if (this.props.onChange) this.props.onChange(this.state.value);
      // Trigger validation
      this.triggerValidate();
    });
  }

  /**
   * HELPERS
   * - getFileImageName
   * - uploadFileImage
  */
  getFileImageName() {
    const { accepted } = this.state;

    if (accepted.length) {
      const current = accepted[0];
      return current.name;
    }

    return 'Select file to upload';
  }

  render() {
    const { properties } = this.props;
    const { accepted } = this.state;

    return (
      <div className="c-file-image">
        <Dropzone
          accept=".jpg,.jpeg,.png"
          ref={(node) => { this.dropzone = node; }}
          className="file-dropzone"
          disableClick
          multiple={false}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          {!accepted.length &&
            <div className="file-placeholder" onClick={this.triggerBrowseOrCancel}>
              {properties.placeholder}
            </div>
          }

          {!!accepted.length && accepted[0].preview &&
            <div className="file-preview">
              <img className="file-image" src={accepted[0].preview} alt={accepted[0].name} />
              <button onClick={this.triggerBrowseOrCancel} className="file-button c-button">
                <Icon name="icon-cross" className="-small" />
              </button>
            </div>
          }
        </Dropzone>
      </div>
    );
  }
}

FileImage.propTypes = {
  properties: React.PropTypes.object.isRequired,
  validations: React.PropTypes.array,
  onChange: React.PropTypes.func
};

export default FileImage;
