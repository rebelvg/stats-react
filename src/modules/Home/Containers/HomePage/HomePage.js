import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import qs from 'qs';
import { Route, Redirect } from 'react-router';

class Home extends Component {
  render() {
    const { search } = this.props.location;

    let searchParams = qs.parse(search, { ignoreQueryPrefix: true });

    if (searchParams.token) {
      const localStorage = window.localStorage;

      localStorage.setItem('token', searchParams.token);

      return <Redirect to="/" />;
    }

    return (
      <HomeWrapper>
        <h2>This is a homepage</h2>
        <img src="https://i.imgur.com/wAUCPw1.png" alt="meme" height="60%" />
      </HomeWrapper>
    );
  }
}

export default Home;

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const HomeWrapper = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & img {
    animation: ${rotate360} 2s linear infinite;
  }
`;
