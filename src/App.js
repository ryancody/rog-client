import React, { Component } from 'react';
import Game from './components/Game'
const conn = require('./components/conn')
require('./style/bulma.css')

class App extends Component {

  handleNewGame = () => {
    conn.test({type:'NEW_GAME'})
  }  
  handlePrintGames = () => {
    conn.test({type:'PRINT_GAMES'})
  }
  handleCloseGame = () => {
    let id = document.getElementById('input').value
    conn.test({type:'CLOSE_GAME', data: id})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <button className='button' onClick={this.handleNewGame}>new game</button>
        <button className='button' onClick={this.handlePrintGames}>print games</button>
        <button className='button' onClick={this.handleCloseGame}>close game</button>
        <input type='text' id='input'></input>
        <Game />
      </div>
    )
  }
}

export default App;
