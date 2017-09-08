import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { setAxiosHeaders, setAxiosDefaults } from './util';
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import UserRegistration from './components/UserRegistration'
import HomePage from './components/HomePage'
import AccountPage from './components/AccountPage'

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {},
    }
  }

  componentWillMount () {
    setAxiosDefaults();
  }
  


  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/user/:userID" component={AccountPage}/>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signUp" component={UserRegistration} />
        </div>
      </Router>
    );
  }
}

export default App;
