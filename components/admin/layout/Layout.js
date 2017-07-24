import React from 'react';
import PropTypes from 'prop-types';

// Redux
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';
import { toggleModal, setModalOptions } from 'redactions/modal';
import { setUser } from 'redactions/user';

// Components
import Header from 'components/admin/layout/Header';
import Head from 'components/admin/layout/head';
import Icons from 'components/admin/layout/icons';
import Tooltip from 'components/ui/Tooltip';
import Toastr from 'react-redux-toastr';

class Layout extends React.Component {

  componentDidMount() {
    this.props.setUser(this.props.user);
  }

  render() {
    const { title, description, url, user } = this.props;
    return (
      <div className="c-page">
        <Head
          title={title}
          description={description}
        />

        <Icons />

        <Header url={url} user={user} />

        <div className="container">
          { this.props.children }
        </div>

        <Tooltip />

        <Toastr
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }

}

Layout.propTypes = {
  user: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,

  // Store
  setUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  toggleModal: () => {
    dispatch(toggleModal());
  },
  setModalOptions: () => {
    dispatch(setModalOptions());
  },
  setUser: (user) => {
    dispatch(setUser(user));
  }
});

export default withRedux(initStore, null, mapDispatchToProps)(Layout);
