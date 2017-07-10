import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import DatasetForm from 'components/admin/dataset/form/DatasetForm';

class DatasetNew extends React.Component {

  render() {
    const { user } = this.props;
    return (
      <div className="c-datasets-new">
        <DatasetForm
          application={['rw']}
          authorization={user.token}
          onSubmit={() => Router.pushRoute('admin_data', { tab: 'datasets' })}
        />
      </div>
    );
  }
}

DatasetNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(DatasetNew);
