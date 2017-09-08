import React, { Component } from 'react'
import axios from 'axios'

class AccountPage extends Component {
  constructor (){
    super()
    this.state = {
      activeBook: {}
    }
  }
  componentWillMount(){
    axios.get(`api/books`)
      .then((response) => {
        const newState = {...this.state}
        newState.activeBook = response.data
        this.setState(newState)
      })
  }
  render () {
    return (
      <div>
        <h1>Hello, {this.props.user.nickname}</h1>
        <h3>Your account balance is {this.state.activeBook.balance}</h3>
      </div>
    )
  }
}

export default AccountPage;
