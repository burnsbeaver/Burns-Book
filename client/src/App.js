import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import UserRegistration from './components/UserRegistration'
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signUp" component={UserRegistration} />
        </div>
      </Router>
    );
  }
}

export default App;
