import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progress-2';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateIsLoading } from 'redactions/page';
import { toggleModal, setModalOptions } from 'redactions/modal';

// Components
import { Router } from 'routes';
import Header from 'components/admin/layout/Header';
import Head from 'components/admin/layout/head';
import Icons from 'components/admin/layout/icons';
import Tooltip from 'components/ui/Tooltip';
import Modal from 'components/ui/Modal';
import Toastr from 'react-redux-toastr';
import Spinner from 'components/ui/Spinner';

class Layout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      Progress.show();
      this.props.updateIsLoading(true);
    };
    Router.onRouteChangeComplete = () => {
      this.props.updateIsLoading(false);
      Progress.hideAll();
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.modalOpen !== newProps.modal.open) {
      this.setState({ modalOpen: newProps.modal.open });
    }
  }

  render() {
    const { title, description, isLoading, modal } = this.props;

    return (
      <div className="c-page">
        <Head
          title={title}
          description={description}
        />

        <Icons />

        <Progress.Component />

        <Header />

        <div className="container">
          {this.props.children}
        </div>

        <Tooltip />

        <Modal
          open={this.state.modalOpen}
          options={modal.options}
          loading={modal.loading}
          toggleModal={this.props.toggleModal}
          setModalOptions={this.props.setModalOptions}
        />

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
  description: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  updateIsLoading: PropTypes.func
};

Layout.defaultProps = {
  title: 'PREP Manager',
  description: '',
  isLoading: false
};

const mapStateToProps = state => ({
  isLoading: state.page.isLoading,
  modal: state.modal
});

const mapDispatchToProps = dispatch => ({
  updateIsLoading: bindActionCreators(isLoading => updateIsLoading(isLoading), dispatch),
  toggleTooltip: () => dispatch(toggleTooltip()),
  toggleModal: open => dispatch(toggleModal(open, {}, true)),
  setModalOptions: options => dispatch(setModalOptions(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
