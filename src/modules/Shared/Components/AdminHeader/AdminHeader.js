import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

class AdminHeader extends Component {
  render() {
    let isLoggedIn = !!window.localStorage.getItem('token');

    return (
      <HeaderWrap>
        <StyledLink exact to="/admin/users">
          Users
        </StyledLink>
      </HeaderWrap>
    );
  }
}

export default AdminHeader;

const StyledLink = styled(NavLink)`
  margin: 0px 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  &.active {
    color: red;
  }
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
  &.active {
    color: red;
  }
`;
