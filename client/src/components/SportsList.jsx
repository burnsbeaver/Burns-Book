import React, { Component } from 'react'
import styled from 'styled-components'

const Sports = styled.div`
display: flex;
justify-content: space-around;
flex-wrap: wrap;
width: 80%;
margin-left: 10%;
margin-right: 10%;
margin-bottom: 5vh;
h5 {
  margin-bottom: 0;
}
img {
  height: 10vh;
  width: 10vh;
  min-width: 60px;
  min-height: 60px;
  margin: 15px;
  margin-top: 2px;
  box-shadow: 5px 5px 5px #888888;
}
`

class SportsList extends Component {
  _handleClick = (league) => {
    console.log(league)
    this.props.search(league)
  }
  render () {
    return(
      <Sports>
        <div  onClick={() => this._handleClick('nfl')}>
          <h5>NFL</h5>
          <img src="https://usatftw.files.wordpress.com/2014/10/nfl_logo_new2.jpg?w=1000&h=750" alt="NFL"/>
        </div>
        <div onClick={() => this._handleClick('nba')}>
          <h5>NBA</h5>
          <img src="https://www.logodesignlove.com/images/classic/nba-logo.jpg" alt="NBA"/>
        </div>
        <div onClick={() => this._handleClick('nhl')}>
          <h5>NHL</h5>
          <img src="http://logodatabases.com/wp-content/uploads/2012/03/nhl-logo.jpg" alt="NHL"/>
        </div>
        <div onClick={() => this._handleClick('mlb')}>
          <h5>MLB</h5>
          <img src="https://assets.vg247.com/current//2017/07/mlb_logo_wide.png" alt="MLB"/>
        </div>
        <div onClick={() => this._handleClick('soccer')}>
          <h5>SOCCER</h5>
          <img src="https://i.ebayimg.com/images/g/X-8AAOxyNmZTj3tF/s-l300.jpg" alt="SOCCER"/>
        </div>
      </Sports>
    )
  }
}

export default SportsList;
