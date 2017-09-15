import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { setAxiosDefaults } from './util';
import axios from 'axios'
import { injectGlobal } from 'styled-components'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import UserRegistration from './components/UserRegistration'
import HomePage from './components/HomePage'
import AccountPage from './components/AccountPage'
import ShowActiveBook from './components/ShowActiveBook'


injectGlobal`
  body {
    background-image: url('https://image.freepik.com/free-vector/grey-linen-texture-background_1053-253.jpg');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    font-family: courier;
    font-weight: 600;
    button {
      background: #7fccff;
      background-image: -webkit-linear-gradient(top, #7fccff, #0b1114);
      background-image: -moz-linear-gradient(top, #7fccff, #0b1114);
      background-image: -ms-linear-gradient(top, #7fccff, #0b1114);
      background-image: -o-linear-gradient(top, #7fccff, #0b1114);
      background-image: linear-gradient(to bottom, #7fccff, #0b1114);
      -webkit-border-radius: 6;
      -moz-border-radius: 6;
      border-radius: 6px;
      font-family: Arial;
      color: #ffffff;
      font-size: 15px;
      padding: 4px 8px 4px 8px;
      text-decoration: none;
    }

    button:hover {
      background: #3cb0fd;
      background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
      background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
      background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
      text-decoration: none;
    }
  }
  input {
    padding: 10px;
    border: solid 5px #c9c9c9;
    box-shadow: inset 0 0 0 1px #707070;
    transition: box-shadow 0.3s, border 0.3s;
    margin: 20px;
  }
  input:focus{
    border: solid 5px #969696;
  }
    `

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {}
    }
  }

  componentWillMount () {
    setAxiosDefaults();
    this._validateUser();
  }

  _logout = () => {
    axios.delete('/auth/sign_out')
      .then((response) => {
        localStorage.clear()
        this.setState({user: {}})
      })
  }

  _validateUser = async () => {
    try {
      const response = await axios.get('auth/validate_token', {
        // params: {
        //   uid: localStorage.getItem("uid"),
        //   client: localStorage.getItem("client"),
        //   access-token: localStorage.getItem("access-token")
        // }
      })
      const newState = {...this.state}
      newState.user = response.data.data
      this.setState(newState)
    } catch (err) {
      console.log('Error: ' + err)
      Redirect

    }
  }

  _setUserState = (returnedUser) => {
    const newState = {...this.state}
    newState.user = returnedUser
    this.setState(newState)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar user={this.state.user} logout={this._logout}/>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signin" render= {routeProps =>
              <SignIn {...routeProps}
                setuser={this._setUserState}
            />}/>
          <Route exact path="/signup" render= {routeProps =>
              <UserRegistration {...routeProps}
                setuser={this._setUserState}
            />}/>
          <Route exact path="/account" render= {routeProps =>
              <AccountPage {...routeProps}
                user={this.state.user}
            />}/>
          <Route exact path="/openbets" render= {routeProps =>
              <ShowActiveBook {...routeProps}
                user={this.state.user}
            />}/>
        </div>
      </Router>
    );
  }
}

export default App;
