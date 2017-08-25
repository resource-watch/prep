import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateIsLoading } from 'redactions/page';

// Components
import { Router } from 'routes';
import Header from 'components/admin/layout/Header';
import Head from 'components/admin/layout/head';
import Icons from 'components/admin/layout/icons';
import Tooltip from 'components/ui/Tooltip';
import Toastr from 'react-redux-toastr';
import Spinner from 'components/ui/Spinner';

class Layout extends React.PureComponent {
  componentDidMount() {
    Router.onRouteChangeStart = () => {
      this.props.updateIsLoading(true);
    };
    Router.onRouteChangeComplete = () => {
      this.props.updateIsLoading(false);
    };
  }

  render() {
    const { title, description, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className="c-page">
          <Head title={title} description={description} />
          <Spinner className="-light" isLoading={isLoading} />
        </div>
      );
    }

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
  isLoading: state.page.isLoading
});

const mapDispatchToProps = dispatch => ({
  updateIsLoading: bindActionCreators(isLoading => updateIsLoading(isLoading), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
