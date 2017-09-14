import React, { Component } from 'react'
import styled from 'styled-components'

const Bet = styled.div`
  width: 90%;
  margin: 0 2.5%;
  padding: 0 2.5%;
  display: flex;
  justify-content: space-between;
  border: solid black 1px;
  h3{
    width: 25%
  }
`

class OpenBet extends Component {
  render () {
    return(
      <Bet>
        <h3>{this.props.bet.team} {this.props.bet.spread}</h3>
        <h3>Risk: {this.props.bet.risk} Win: {this.props.bet.payout}</h3>
      </Bet>
    )
  }
}

export default OpenBet;
