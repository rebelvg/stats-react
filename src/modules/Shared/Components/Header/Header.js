import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = () => (
    <HeaderWrap>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/streams">Streams</StyledLink>
        <StyledLink to="/subscribers">Subscribers</StyledLink>
        <StyledLink to="/ips">IPs</StyledLink>
        <StyledLink to="/live">Live!</StyledLink>
        <StyledLink to="/graphs">Graphs</StyledLink>
        <StyledLink to="/api/users/auth/google">Login</StyledLink>
    </HeaderWrap>
);

export default Header;

const StyledLink = styled(Link)`
  margin: 0px 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
`;

const HeaderWrap = styled.div`
  width: 100%;
  background-color: #262626;
  padding: 15px 0px;
`;
