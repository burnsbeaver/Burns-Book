import React, { Component } from 'react'
import styled from 'styled-components'



class ClosedBet extends Component {
  render () {
    const backgroundColor = () => {
      if (this.props.bet.win === "win") {
        return '#a5d6a7'
      } else if (this.props.bet.win === "loss") {
        return '#ef9a9a'
      } else {
        return '#fff59d'
      }
    }

    const Bet = styled.div`
      width: 90%;
      margin: 0 2.5%;
      padding: 0 2.5%;
      display: flex;
      justify-content: space-between;
      border: solid black 1px;
      background-color: ${backgroundColor()};

      h3{
        width: 20%;
      }
      h3.team{
        width: 60%;
      }
    `
    return(
      <Bet>
        <h3 className="team">{this.props.bet.team} {this.props.bet.spread}</h3>
        <h3 className="risk">Risk: {this.props.bet.risk}</h3>
        <h3 className="win">Win: {this.props.bet.payout}</h3>
        <h3>Result: {this.props.bet.win.toUpperCase()}</h3>
      </Bet>
    )
  }
}

export default ClosedBet;
