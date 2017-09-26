import React from 'react';

// Services
import WidgetsService from 'services/WidgetsService';
import { toastr } from 'react-redux-toastr';

class DeleteAction extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.handleOnClickDelete = this.handleOnClickDelete.bind(this);

    // SERVICES
    this.service = new WidgetsService({
      authorization: props.authorization
    });
  }

  handleOnClickDelete(e) {
    e && e.preventDefault() && e.stopPropagation();

    const { data } = this.props;

    toastr.confirm(`Are you sure that you want to delete: "${data.name}"`, {
      onOk: () => {
        this.service.deleteData({ id: data.id, dataset: data.dataset })
          .then(() => {
            this.props.onRowDelete(data.id);
            toastr.success('Success', `The widget "${data.id}" - "${data.name}" has been removed correctly`);
          })
          .catch((errors) => {
            try {
              console.log(errors);
              errors.forEach(er => (
                toastr.error('Error', er.detail)
              ));
            } catch (e) {
              toastr.error('Error', `The widget "${data.id}" - "${data.name}" was not deleted. Try again`);
              console.error(errors);
            }
          });
      },
      onCancel: () => console.info('canceled')
    });
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
