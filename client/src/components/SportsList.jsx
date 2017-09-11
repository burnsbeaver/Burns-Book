import React, { Component } from 'react'
import styled from 'styled-components'

const Sports = styled.div`
display: flex;
justify-content: space-around;
width: 40%;
margin-left: 30%;
margin-right: 30%;
margin-bottom: 5vh;
h5 {
  margin-bottom: 0;
}
img {
  height: 10vh;
  width: 10vh;
  margin: 15px;
  margin-top: 2px;
  box-shadow: 5px 5px 5px #888888;
}
`

class SportsList extends Component {
  _handleClick = () => {
    this.props.search()
  }
  render () {
    return(
      <Sports>
        <div onClick={this._handleClick}>
          <h5>NFL</h5>
          <img src="https://usatftw.files.wordpress.com/2014/10/nfl_logo_new2.jpg?w=1000&h=750" alt="NFL"/>
        </div>
        <div onClick={this._handleClick}>
          <h5>NBA</h5>
          <img src="https://www.logodesignlove.com/images/classic/nba-logo.jpg" alt="NBA"/>
        </div>
        <div onClick={this._handleClick}>
          <h5>NHL</h5>
          <img src="http://logodatabases.com/wp-content/uploads/2012/03/nhl-logo.jpg" alt="NHL"/>
        </div>
        <div onClick={this._handleClick}>
          <h5>MLB</h5>
          <img src="https://assets.vg247.com/current//2017/07/mlb_logo_wide.png" alt="MLB"/>
        </div>
      </Sports>
    )
  }
}

export default SportsList;
