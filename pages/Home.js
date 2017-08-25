import React from 'react';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'store';

class Home extends React.PureComponent {
  static async getInitialProps({ req, user, isServer }) {
    return { user };
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
