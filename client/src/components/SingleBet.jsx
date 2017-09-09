import React, { Component } from 'react'
import styled from 'styled-components'

const Bet = styled.div`
  color: blue;
  border: solid black 1px;
`

class SingleBet extends Component {
  _handleClick = () => {
    this.props.viewBettingSlip(this.props.result)
  }
  render () {
    return(
      <Bet>
        <h3>Home: {this.props.result.HomeTeam} at {this.props.result.Odds[0].PointSpreadHome} ({this.props.result.Odds[0].PointSpreadHomeLine})
           <br/> VS <br/>
           Away: {this.props.result.AwayTeam} at {this.props.result.Odds[0].PointSpreadAway} ({this.props.result.Odds[0].PointSpreadAwayLine})</h3>
        <h5>{this.props.result.MatchTime}</h5>
        <button onClick={this._handleClick}>View Full Betting Slip</button>
      </Bet>
    )
  }
}

export default SingleBet;
