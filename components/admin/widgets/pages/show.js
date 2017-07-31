import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import WidgetsForm from 'components/admin/widgets/form/WidgetsForm';

function WidgetsShow(props) {
  const { id, user } = props;

  return (
    <div className="c-widgets-show">
      <WidgetsForm
        id={id}
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_widgets', { tab: 'widgets' })}
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

export default withRedux(initStore, mapStateToProps, null)(WidgetsShow);
