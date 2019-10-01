import React, {Component} from 'react'

class Tile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: 0,
            tileNo: this.props.tile,
            x: this.props.x,
            y: this.props.y,
            content: this.props.content
        }
    }

    report () {
        console.log('im ' + this.state.x + ' ' + this.state.y)
    }

    render() {
        return(
            <div key={this.props.i} className={`unit ${this.state.type}`} onClick={this.props.handleClick}>{this.state.content}</div>
        )
    }
}

export default Tile