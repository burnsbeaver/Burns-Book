import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { setAxiosDefaults } from './util';
import axios from 'axios'
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import UserRegistration from './components/UserRegistration'
import HomePage from './components/HomePage'
import AccountPage from './components/AccountPage'
import ShowActiveBook from './components/ShowActiveBook'


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
