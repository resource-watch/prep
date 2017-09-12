import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';


// Components
import WidgetsForm from 'components/admin/widgets/form/WidgetsForm';

function WidgetsShow(props) {
  const { id, user } = props;

  return (
    <div className="c-widgets-show">
      <WidgetsForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_data', { tab: 'widgets' })}
      />
    </div>
  );
}

WidgetsShow.propTypes = {
  id: PropTypes.string,
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, null)(WidgetsShow);
