import React from 'react';
import { Router } from 'routes';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

// Components
import ToolsForm from 'components/admin/tools/form/ToolsForm';

function ToolsNew(props) {
  const { user } = props;

  return (
    <div className="c-tools-new">
      <ToolsForm
        authorization={user.token}
        onSubmit={() => Router.pushRoute('admin_dashboards', { tab: 'tools' })}
      />
    </div>
  );
}

ToolsNew.propTypes = {
  // Store
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default withRedux(initStore, mapStateToProps, null)(ToolsNew);
