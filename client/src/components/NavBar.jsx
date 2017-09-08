import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render () {
    return(
      <nav>
       <h1>Burns-Book</h1>
       <div>
         <Link to="/">Home</Link>
         <Link to="/signUp">Sign Up</Link>
         <Link to="/signin">Log In</Link>
       </div>
     </nav>
    )
  }
}

export default NavBar;
