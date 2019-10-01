import React, {Component} from 'react'
import Tile from './Tile'
require('../style/grid-style.css')

class Game extends Component {

    constructor(props) {
        super(props)

        this.state = {
            gameState: null,
            width: 24,
            height: 24,
            charPos: {x: 0, y: 0}
        }

    }

    keyFunction = (event) => {
        console.log(event.key)
        switch(event.key){
            case 'ArrowUp':
                this.setState({charPos: {x: this.state.charPos.x, y: this.state.charPos.y + 1}})
                break
            case 'ArrowDown':
                this.setState({charPos: {x: this.state.charPos.x, y: this.state.charPos.y - 1}})
                break
            case 'ArrowLeft':
                this.setState({charPos: {x: this.state.charPos.x - 1, y: this.state.charPos.y}})
                break
            case 'ArrowRight':
                this.setState({charPos: {x: this.state.charPos.x + 1, y: this.state.charPos.y}})
                break
            default:
                console.log(event.key)
                break
        }
        console.log(this.state.charPos)
    }

    componentDidMount () {
        document.addEventListener("keydown", this.keyFunction, false);
    }

    updateTile = (x,y) => {
        console.log('x: ' + x + ', y: ' + y)
    }

    handleKeyPress = (e) => {
        console.log('pressed',e.key)
    }

    render() {

        let grid = []
        
        for(let y = this.state.width - 1; y >= 0; y--) {
            for(let x = 0; x < this.state.height; x++) {
                let i = this.state.width * y + x
                            
                grid.push(<Tile key={i} tile={i} x={x} y={y} handleClick={() => this.updateTile(x,y)} />)
            }
        }

        return(
            <section className='section'>
                <span className='game-boundary'>
                    <div className='game-grid'>
                        {grid}
                    <span className='player' role='img' aria-label='' style={{bottom: 32 * this.state.charPos.y + 'px', left: 32 * this.state.charPos.x + 'px'}}>🧝</span>
                    </div>
                </span>
            </section>
        )
    }
}

export default Game