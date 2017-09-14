import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from "styled-components";

const Navbar = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  background-color: black;
  box-shadow: 0px 1px 6px black;
  color: white;
  a {
    text-decoration: none;
    margin: 10px 10px;
    &:visited {
      color: white;
    }
  }
`;

class NavBar extends Component {
  _logout = () => {
    this.props.logout()
  }

  render () {
    if (this.props.user.email) {
      return (
        <Navbar>
         <h1>OnSide</h1>
         <div>
           <h3>Hello, {this.props.user.nickname}</h3>
           <Link to="/account">Account Page</Link>
           <a onClick={this._logout}>Logout</a>
         </div>
       </Navbar>
      )
    }else {
      return(
        <Navbar>
         <h1>OnSide</h1>
         <div>
           <Link to="/">Home</Link>
           <Link to="/signUp">Sign Up</Link>
           <Link to="/signin">Log In</Link>
         </div>
       </Navbar>
      )
    }
  }
}

export default NavBar;
