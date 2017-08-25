import React from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

class Home extends React.PureComponent {
  static async getInitialProps({ req, user, isServer }) {
    return { req, user, isServer };
  }
  render() {
    return (
      <div>
        Welcome
      </div>
    );
  }
}

export default withRedux(initStore)(Home);
