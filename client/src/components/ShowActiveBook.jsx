import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import OpenBet from './OpenBet'
import ClosedBet from './ClosedBet'

class ShowActiveBook extends Component {
  constructor(){
    super()
    this.state = {
      openBets: [],
      closedBets: []
    }
  }
  componentWillMount(){
    axios.get("/api/books/2")
      .then((response)=> {
        const newState = {...this.state}
        newState.openBets = response.data.open
        newState.closedBets = response.data.closed
        this.setState(newState)
      })
  }
  render () {
    if (!localStorage['access-token']) {
      console.log('Redirect')
      return (<Redirect to='/' />)
    }
    const openBets = this.state.openBets.map((bet, i) => {
      return <OpenBet key={i} bet={bet} />
    })
    const closedBets = this.state.closedBets.map((bet, i) => {
      return <ClosedBet key={i} bet={bet} />
    })
    return (
      <div>
        <h1>Open Bets:</h1>
        {openBets}
        <h1>History:</h1>
        {closedBets}
      </div>
    )
  }
}

export default ShowActiveBook;
