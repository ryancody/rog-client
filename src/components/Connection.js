const ws = new WebSocket('ws://localhost:8080')
const mp = require('./MessageProcessor')

exports.ws = ws

exports.send = (m) => {
    console.log('sending message', m)
    ws.send(JSON.stringify(m))
}

ws.onmessage = (event) => {
    mp.process(event.data, ws)
}