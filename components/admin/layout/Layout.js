import React from 'react';
import PropTypes from 'prop-types';

// Redux
// import { connect } from 'react-redux';
// import { toggleModal, setModalOptions } from 'redactions/modal';

// Components
import Header from 'components/admin/layout/Header';
import Head from 'components/admin/layout/head';
import Icons from 'components/admin/layout/icons';
import Tooltip from 'components/ui/Tooltip';
import Toastr from 'react-redux-toastr';

class Layout extends React.PureComponent {
  render() {
    const { title, description } = this.props;
    return (
      <div className="c-page">
        <Head
          title={title}
          description={description}
        />

        <Icons />

        <Header />

        <div className="container">
          {this.props.children}
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
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

// const mapStateToProps = state => ({
//   user: state.user,
//   routes: state.routes
// });

// const mapDispatchToProps = dispatch => ({
//   toggleModal: () => {
//     dispatch(toggleModal());
//   },
//   setModalOptions: () => {
//     dispatch(setModalOptions());
//   }
// });

export default Layout;
