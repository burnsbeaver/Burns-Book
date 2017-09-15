import React, { Component } from 'react'
import styled from 'styled-components'
import Moment from 'react-moment';
import moment from 'moment'
import 'moment-timezone'
import Number from './Number'

const Bet = styled.div`
  color: blue;
  border: solid black 1px;
  button {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`

class SingleBet extends Component {
  _handleClick = () => {
    this.props.viewBettingSlip(this.props.result)
  }
  render () {
    const dateToFormat = moment(this.props.result.MatchTime).format('LLLL')
    return(
      <Bet>
        <h3>Home: {this.props.result.HomeTeam} at <Number number={this.props.result.Odds[0].PointSpreadHome} /> (<Number number={this.props.result.Odds[0].PointSpreadHomeLine} /> )
           <br/> VS <br/>
           Away: {this.props.result.AwayTeam} at <Number number={this.props.result.Odds[0].PointSpreadAway} /> (<Number number={this.props.result.Odds[0].PointSpreadAwayLine} />)</h3>
        <div>{dateToFormat}</div>
        <button onClick={this._handleClick}>View Full Betting Slip</button>
      </Bet>
    )
  }
}

export default SingleBet;
