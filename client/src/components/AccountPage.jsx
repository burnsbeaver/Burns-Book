import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Moment from 'react-moment'
import moment from 'moment'
import axios from 'axios'
import SingleBet from './SingleBet'
import BettingSlip from './BettingSlip'
import SportsList from './SportsList'

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
    this._resolveBets()
  }
  _handleChange = (e) => {
    const attributeValue = e.target.value
    const attributeName = e.target.name
    const newState = {...this.state}
    newState.search[attributeName] = attributeValue
    this.setState(newState)
  }
  _handleSearch = async (league) => {
    try {
      const response = await axios.get(`api/bets/get_all_bets/${league}`)
      const newState = {...this.state}
      newState.searchResults = response.data
      this.setState(newState)
    }
    catch (err){
      console.log("Error: " + err)
    }

  }
  _resolveBets = async () => {
    const response = await axios.get('/api/books/resolve')
    const newState = {...this.state}
    newState.activeBook = response.data
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
    var date = new Date()
    var starttime = moment(payload.start, moment.ISO_8601);
    var hasGameStarted = (date - starttime)
    console.log(hasGameStarted)
    if (hasGameStarted > 0) {
      alert('Game has started, to late to put in this bet')
    } else {
      const response = await axios.post('api/bets', payload)
      console.log(response)
      this._viewSearchResults()
    }
  }

  render () {
    var date = new Date
    if (!localStorage['access-token']) {
      console.log('Redirect')
      return (<Redirect to='/' />)
    }
    const searchResults = this.state.searchResults.map((result, i) => {
      if (result.HomeTeam.toLowerCase().indexOf(this.state.search.team.toLowerCase()) !== -1 || result.AwayTeam.toLowerCase().indexOf(this.state.search.team.toLowerCase()) !== -1) {
        return <SingleBet key={i} result={result} viewBettingSlip={this._viewBettingSlip}/>
      }
    })
    if (!this.state.bettingSlip) {
      return (
        <div>
          <h1>Hello, {this.props.user.nickname}</h1>
          <h3>Your account balance is {this.state.activeBook.balance}</h3>
          <button onClick={this._resolveBets}>Resolve Open Bets</button>
          <Link to="/openbets">Details</Link>
          <div>
            <h3>Click on a league to see all odds for that league!</h3>
            <SportsList search={this._handleSearch}/>
            <h3>Browse all, or narrow down your search results below</h3>
            <form>
              <input type="text" name="team" placeholder="Search by team" onChange={this._handleChange} />
            </form>
            <Moment parse="YYYY-MM-DD HH" interval={3000}>{new Date()}</Moment>
            <h3>{this.state.searchResults[1] ? 'Results:' : 'No odds for this league'}</h3>
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
