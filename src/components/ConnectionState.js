import React, { Component } from 'react';
import {ws} from './Connection'

class ConnectionState extends Component {

    constructor(props) {
        super(props)

        let connectionChange = () => {

            let timer = 0
            if(ws.readyState === 1) {
                timer = setTimeout(() => this.handleClose(), 3000)
            }

            this.setState(
                {
                    display:true, 
                    status:ws.readyState,
                    timer: timer
                }
            )
        }
        ws.onopen = connectionChange
        ws.onclose = connectionChange

        this.state = {
            status: ws.readyState,
            display: true,
            timer: 0
        }
    }

    handleClose = () => {
        this.setState({display:false})
    }

    render() {

        let header = 'Connection Status'
        let body = ''
        let color = ''
        let closeButton = <button className='delete' aria-label='delete' onClick={this.handleClose}></button>
        
        switch(this.state.status){
            case 0:
                body = <span><strong>Connecting...</strong> Please Wait</span>
                color = 'is-info'
                break
            case 1:
                body = <span><strong>Connected!</strong> Connection successful.</span>
                color = 'is-success'
                break
            case 2:
                body = <span><strong>Closing...</strong> You are being disconnected from the server</span>
                color = 'is-warning'
                break
            case 3:
                body = <span><strong>Disconnected!</strong> You have been disconnected from the server.  Refresh this page to try to reconnect.</span>
                color = 'is-danger'
                closeButton = null
                break
            default:
                header = ''
                break
        }

        let isHidden = ''
        if(!this.state.display) {
            isHidden = 'is-hidden'
        }

        let s = {
            position: 'fixed',
            zIndex: 1,
            margin: 0,
            bottom: '10px',
            left: '10px',
            right: '10px'
        }

        return (
            <article style={s} className={`message ${color} ${isHidden}`}>
                <div className='message-header'>
                    <p>{header}</p>
                    {closeButton}
                </div>
                <div className='message-body'>
                    {body}
                </div>
            </article>
        )
    }

}

export default ConnectionState