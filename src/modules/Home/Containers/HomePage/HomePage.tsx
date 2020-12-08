import React, { Component } from 'react';
import qs from 'qs';
import { Redirect } from 'react-router';

class Login extends Component<any, any> {
  render() {
    const { search } = this.props.location;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    if (searchParams.token) {
      const localStorage = window.localStorage;

      localStorage.setItem('token', searchParams.token);
    }

    return <Redirect to="/" />;
  }
}

export default Login;
