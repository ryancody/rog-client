import React, {Component} from 'react'
require('../grid-style.css')

class Game extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {

        let arr = []
        for(let i = 0; i < 256; i++) {
            arr.push(i)
        }
        let squares = arr.map( (i) => {
            return <div key={i} className='unit'> </div>
        })
        return(
            <section className='section'>
                <div className='game-grid'>
                    {squares}
                </div>
            </section>
        )
    }
}

export default Game