import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { initStore } from 'store';
import { toggleModal, setModalOptions } from 'redactions/modal';
import { setUser } from 'redactions/user';

// Components
import Icons from 'components/app/layout/icons';
import Header from 'components/app/layout/Header';
import Footer from 'components/app/layout/Footer';
import Tooltip from 'components/ui/Tooltip';
import Head from 'components/app/layout/head';
import Modal from 'components/ui/Modal';

const fullScreenPages = [
  '/app/Explore',
  '/app/Pulse'
];


class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  componentDidMount() {
    this.props.setUser(this.props.user);
  }

  componentWillReceiveProps(newProps) {
    if (this.state.modalOpen !== newProps.modal.open) {
      this.setState({ modalOpen: newProps.modal.open });
    }
  }

  render() {
    const { title, description, url, user, pageHeader, modal } = this.props;
    const fullScreen = url.pathname && fullScreenPages.indexOf(url.pathname) !== -1;

    return (
      <div className="c-page">
        <Head
          title={title}
          description={description}
        />

        <Icons />

        <Header
          user={user}
          pageHeader={pageHeader}
        />

        <div className="container">
          {this.props.children}
          {!fullScreen && <Footer />}
        </div>

        <Tooltip />

        <Modal
          open={this.state.modalOpen}
          options={modal.options}
          loading={modal.loading}
          toggleModal={this.props.toggleModal}
          setModalOptions={this.props.setModalOptions}
        />

      </div>
    );
  }

}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
  url: PropTypes.object,
  pageHeader: PropTypes.bool,
  // Store
  modal: PropTypes.object,
  toggleModal: PropTypes.func,
  setModalOptions: PropTypes.func,
  setUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
