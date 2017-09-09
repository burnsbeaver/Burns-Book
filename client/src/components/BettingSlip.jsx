import React, { Component } from 'react'
import styled from 'styled-components'

const Bet = styled.div`
  display: flex;
  justify-content: space-around;
  color: blue;
  border: solid black 1px;
`

class BettingSlip extends Component {
  constructor(){
    super()
    this.state = {
      bettingInfo: {},
      awayTeamSpreadBet: {
        amountToRisk: "",
        amountToWin: ""
      },
      homeTeamSpreadBet: {
        amountToRisk: "",
        amountToWin: ""
      }
    }
  }
  componentWillMount(){
    const newState = {...this.state}
    newState.bettingInfo = this.props.bettinginfo
    this.setState(newState)
  }
  _handleClick = () => {
    this.props.viewsearchresults()
  }
  _handleChangeAwaySpread = (e) => {
    const newState = {...this.state}
    const attributeName = e.target.name
    const attributeValue = e.target.value
    newState.awayTeamSpreadBet[attributeName] = attributeValue
    const awayLine = this.state.bettingInfo.Odds[0].PointSpreadAwayLine
    if (awayLine < 0) {
      newState.awayTeamSpreadBet.amountToWin = Math.round((100 * attributeValue) / Math.abs(awayLine))
      this.setState(newState)
    } else {
      console.log(awayLine)
      newState.awayTeamSpreadBet.amountToWin = Math.round(attributeValue / 4)
      this.setState(newState)
    }
  }
  _handleChangeHomeSpread = (e) => {
    const newState = {...this.state}
    const attributeName = e.target.name
    const attributeValue = e.target.value
    newState.homeTeamSpreadBet[attributeName] = attributeValue
    const homeLine = this.state.bettingInfo.Odds[0].PointSpreadHomeLine
    if (homeLine < 0) {
      newState.homeTeamSpreadBet.amountToWin = Math.round((100 * attributeValue) / Math.abs(homeLine))
      this.setState(newState)
    } else {
      newState.homeTeamSpreadBet.amountToWin = Math.round((homeLine * attributeValue) / 100)
      this.setState(newState)
    }
    this.setState(newState)
  }
  render () {
    return (
      <div>
        <button onClick={this._handleClick}>Cancel Bet</button>
        <h3>Instructions:</h3>
        <p>For everybet you would to make, please enter the amount you would like to wager. Then, press submit to recieve a confimation STUFF</p>
        <Bet>
          <h3>Home: {this.state.bettingInfo.HomeTeam} {this.state.bettingInfo.Odds[0].PointSpreadHome} ({this.state.bettingInfo.Odds[0].PointSpreadHomeLine})</h3>
          <h3>Risk: <input type="number" name="amountToRisk" placeholder="Amount to Wager" onChange={this._handleChangeHomeSpread}/> To Win: {this.state.homeTeamSpreadBet.amountToWin}</h3>
          <button>Submit</button>
        </Bet>
        <Bet>
          <h3>Away: {this.state.bettingInfo.AwayTeam} {this.state.bettingInfo.Odds[0].PointSpreadAway} ({this.state.bettingInfo.Odds[0].PointSpreadAwayLine})</h3>
          <h3>Risk: <input type="number" name="amountToRisk" placeholder="Amount to Wager" onChange={this._handleChangeAwaySpread}/> To Win: {this.state.awayTeamSpreadBet.amountToWin}</h3>
          <button>Submit</button>
        </Bet>

      </div>
    )
  }
}

export default BettingSlip;
