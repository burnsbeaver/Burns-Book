import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import nflData from '../nflData.js'
import mlbData from '../mlbData.js'
import axios from 'axios'
import SingleBet from './SingleBet'
import BettingSlip from './BettingSlip'

class AccountPage extends Component {
  constructor (){
    super()
    this.state = {
      search: {
        team: "",
      },
      activeBook: {},
      searchResults: [],
      bettingSlip: false,
      bettingSlipGameInfo: {}
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
    newState.searchResults = mlbData
    this.setState(newState)
  }
  _viewBettingSlip = (bet) => {
    const newState = {...this.state}
    newState.bettingSlipGameInfo = bet
    newState.bettingSlip = true
    this.setState(newState)
  }
  _viewSearchResults = () => {
    const newState = {...this.state}
    newState.bettingSlip = false
    this.setState(newState)
  }
  _submitBet = async (payload) => {
    const response = await axios.post('api/bets', payload)
    console.log(response)
    this._viewSearchResults()
  }

  render () {
    const searchResults = this.state.searchResults.map((result, i) => {
      return <SingleBet key={i} result={result} viewBettingSlip={this._viewBettingSlip}/>
    })
    if (!this.state.bettingSlip) {
      return (
        <div>
          <h1>Hello, {this.props.user.nickname}</h1>
          <h3>Your account balance is {this.state.activeBook.balance}</h3>
          <Link to="/openbets">Details</Link>
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
    } else {
      return (
        <div>
          <h1>Hello, {this.props.user.nickname}</h1>
          <h3>Your account balance is {this.state.activeBook.balance}</h3>
          <Link to="/openbets">Details</Link>
          <div>
            <h3>New Bet</h3>
            <BettingSlip submitBet={this._submitBet} viewsearchresults={this._viewSearchResults} bettinginfo={this.state.bettingSlipGameInfo}/>
          </div>
        </div>
      )
    }

  }
}

export default AccountPage;
