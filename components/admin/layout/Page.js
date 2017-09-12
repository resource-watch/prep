import React from 'react';
import { setUser } from 'redactions/user';

export default class Page extends React.PureComponent {
  static async getInitialProps({ req, store, isServer }) {
    const { user } = isServer ? req : store.getState();
    if (isServer) store.dispatch(setUser(user));
    return { user, isServer };
  }
}
