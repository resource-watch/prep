import React from 'react';

// Services
import PartnersService from 'services/PartnersService';

class DeleteAction extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.handleOnClickDelete = this.handleOnClickDelete.bind(this);

    // SERVICES
    this.service = new PartnersService();
  }

  handleOnClickDelete(e) {
    e && e.preventDefault() && e.stopPropagation();

    const { data } = this.props;

    if (confirm(`Are you sure that you want to delete: "${data.name}" `)) {
      this.service.deleteData(data.id)
        .then(() => {
          this.props.onRowDelete(data.id);
        })
        .catch((err) => {
          console.error('There was an error with the request. The object was not deleted');
        });
    }
  }

  render() {
    return (
      <span>
        <a href="#delete-dataset" onClick={this.handleOnClickDelete}> Remove </a>
      </span>
    );
  }
}

DeleteAction.propTypes = {
  data: React.PropTypes.object,
  onRowDelete: React.PropTypes.func
};

export default DeleteAction;
