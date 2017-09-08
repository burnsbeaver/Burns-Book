import React, { Component } from 'react'

class AccountPage extends Component {
  render () {
    return (
      <div>
        Hello, {this.props.user.nickname}
      </div>
    )
  }
}

export default AccountPage;
