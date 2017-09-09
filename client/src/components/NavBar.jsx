import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
    margin: 0 5px;
    &:visited {
      color: white;
    }
  }
`;

class NavBar extends Component {
  render () {
    if (this.props.user.name) {
      return (
        <Navbar>
         <h1>Burns-Book</h1>
         <div>
           <h3>Hello, {this.props.user.name}</h3>
           <Link to="/account">Account Page</Link>
         </div>
       </Navbar>
      )
    }else {
      return(
        <Navbar>
         <h1>Burns-Book</h1>
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
