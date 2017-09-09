import React, { Component } from 'react'
import nflData from '../nflData.js'
import axios from 'axios'
import SingleBet from './SingleBet'

class AccountPage extends Component {
  constructor (){
    super()
    this.state = {
      search: {
        team: "",
      },
      activeBook: {},
      searchResults: []
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
  _handleChange = (e) => {
    const attributeValue = e.target.value
    const attributeName = e.target.name
    const newState = {...this.state}
    newState.search[attributeName] = attributeValue
    this.setState(newState)
  }
  _handleSearch = (e) => {
    e.preventDefault()
    const newState = {...this.state}
    newState.searchResults = nflData
    this.setState(newState)
  }

  render () {
    const searchResults = this.state.searchResults.map((result, i) => {
      return <SingleBet key={i} result={result} />
    })
    return (
      <div>
        <h1>Hello, {this.props.user.nickname}</h1>
        <h3>Your account balance is {this.state.activeBook.balance}</h3>
        <div>
          <h3>New Bet</h3>
          <form onSubmit={this._handleSearch}>
            <input type="text" name="team" placeholder="Search by team" onChange={this._handleChange} />
            <input type="submit" value="Search"/>
          </form>
          <h3>Results:</h3>
          {searchResults}
        </div>
      </div>
    )
  }
}

export default AccountPage;
