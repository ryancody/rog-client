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

    let newId = id.getId()

    this.state = {
      currentGame: null,
      id: newId,
      name: 'Player ' + newId,
      joinId: ''
    }

    // when server requests user info, SUBMIT_USER_INFO will be fired
    ee.on('SUBMIT_USER_INFO', () => {

      // tell server your latest user info
      conn.send({type: 'UPDATE_USER_INFO', from: this.state.id, data: {id: this.state.id, name: this.state.name}})
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

  handleUserInfoBlur = () => {

    ee.emit('SUBMIT_USER_INFO')
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

  handleJoinGame = () => {
    conn.send({type: 'JOIN_GAME', from: this.state.id, data: {joinId: this.state.joinId}})
  }

  handleJoinIdChange = () => {
    this.setState({
      joinId: document.getElementById('joinId').value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className='section'>
            <div className='container'>
              <ConnectionState />
              <div className=''>
                Name: <input id='nameInput' className='input' onChange={this.handleNameChange} onBlur={this.handleUserInfoBlur} value={this.state.name}></input>
                ID: <input id='idInput' className='input' onChange={this.handleIdChange} onBlur={this.handleUserInfoBlur} value={this.state.id}></input>
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
                <input id='joinId' className='input' value={this.state.joinId} onChange={this.handleJoinIdChange}></input>
                <button className='button' onClick={this.handleJoinGame}>join game</button>
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
