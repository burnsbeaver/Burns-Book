import React, { Component } from 'react'
import styled from 'styled-components'

const Bet = styled.div`
  color: blue;
`

class SingleBet extends Component {
  render () {
    console.log(this.props.result)
    return(
      <Bet>
        <h3>Home: {this.props.result.HomeTeam} at {this.props.result.Odds[0].PointSpreadHome} <br/> VS <br/> Away: {this.props.result.AwayTeam} at {this.props.result.Odds[0].PointSpreadAway}</h3>
        <h5>{this.props.result.MatchTime}</h5>
        <h5>View Betting Slip</h5>
      </Bet>
    )
  }
}

export default SingleBet;
