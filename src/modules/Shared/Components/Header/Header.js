import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';

const handleLogout = () => {
    window.localStorage.removeItem('token');
};

const Header = () => (
    <HeaderWrap>
        <StyledLink exact to="/">Home</StyledLink>
        <StyledLink to="/streams">Streams</StyledLink>
        <StyledLink to="/subscribers">Subscribers</StyledLink>
        <StyledLink to="/ips">IPs</StyledLink>
        <StyledLink exact to="/live">Live!</StyledLink>
        <StyledLink exact to="/graphs">Graphs</StyledLink>
        {
            !window.localStorage.getItem('token') ?
                <MyLink href={`${window.location.origin}/api/users/auth/google`}>Login</MyLink> :
                <StyledLink to='/' onClick={handleLogout} activeStyle={{
                    fontWeight: 'bold',
                    color: 'white'
                }}>Logout</StyledLink>
        }
    </HeaderWrap>
);

export default Header;

const StyledLink = styled(NavLink)`
  margin: 0px 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  &.active {color:red};
`;

const HeaderWrap = styled.div`
  width: 100%;
  background-color: #262626;
  padding: 15px 0px;
`;

const MyLink = styled.a`
  margin: 0px 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  &.active {color:red};
`;
