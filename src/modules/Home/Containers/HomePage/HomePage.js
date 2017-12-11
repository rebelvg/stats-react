import React from 'react';
import styled, {keyframes} from 'styled-components';

const Home = () => (
    <HomeWrapper>
        <h2>This is home page</h2>
        <img
            src="https://i.imgur.com/wAUCPw1.png"
            alt="meme"
            height="60%"/>
    </HomeWrapper>
);

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
