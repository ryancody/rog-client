import React, { Component } from 'react'
import Game from './components/Game'
import ConnectionState from './components/ConnectionState'
const conn = require('./components/Connection')
const id = require('./components/IdManager')
const ee = require('./components/EventManager').emitter
require('./style/bulma.css')

class App extends Component {

  constructor(props) {
    super(props)

    let rand = id.randomHash()

    this.state = {
      currentGame: null,
      id: rand,
      name: 'Player ' + rand
    }

    ee.on('SUBMIT_USER_INFO', () => {
      conn.send({type: 'UPDATE_USER_INFO', from: id.getId(), data: {id: this.state.id, name: this.state.name}})
    })
  }

  handleNameChange = () => {
    let newName = document.getElementById('nameInput').value
    this.setState({name: newName})
  }

  handleIdChange = () => {
    let newId = document.getElementById('idInput').value
    this.setState({id: newId})
  }

  handleNewGame = () => {
    conn.send({ type: 'NEW_GAME', from: this.state.id })
  }

  handlePrintGames = () => {
    conn.send({ type: 'PRINT_GAMES', from: this.state.id })
  }

  handleCloseGame = () => {
    conn.send({ type: 'CLOSE_GAME', from: this.state.id })
  }

  handlePrintUsers = () => {
    conn.send({type: 'PRINT_USERS', from: this.state.id})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='section'>
            <div className='container'>
              <ConnectionState />
              <div className=''>
                Name: <input id='nameInput' className='input' onChange={this.handleNameChange} value={this.state.name}></input>
                ID: <input id='idInput' className='input' onChange={this.handleIdChange} value={this.state.id}></input>
              </div>
            </div>
          </div>
        </header>
        <div className='section'>
          <div className='container'>

            <div className='field is-grouped'>
              <div className='control'>
                <button className='button' onClick={this.handleNewGame}>new game</button>
              </div>
            </div>
            
            <div className='field is-grouped'>
              <div className='control'>
                <button className='button' onClick={this.handlePrintGames}>print games</button>
              </div>
            </div>

            <div className='field is-grouped'>
              <div className='control'>
                <button className='button' onClick={this.handleCloseGame}>close game</button>
              </div>
            </div>

            <div className='field is-grouped'>
              <div className='control'>
                <button className='button' onClick={this.handlePrintUsers}>print users</button>
              </div>
            </div>

            {(this.state.currentGame) ? <Game /> : null}
          
          </div>
        </div>
      </div>
    )
  }
}

export default App;
