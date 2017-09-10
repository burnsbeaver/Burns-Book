import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { setAxiosDefaults } from './util';
import NavBar from './components/NavBar'
import SignIn from './components/SignIn'
import UserRegistration from './components/UserRegistration'
import HomePage from './components/HomePage'
import AccountPage from './components/AccountPage'


class App extends Component {
  constructor(){
    super()
    this.state = {
      user: {}
    }
  }

  componentWillMount () {
    setAxiosDefaults();
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
          <NavBar user={this.state.user}/>
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
        </div>
      </Router>
    );
  }
}

export default App;
