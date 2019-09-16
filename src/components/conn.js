 const ws = new WebSocket('ws://localhost:8080')

exports.test = (m) => {
    console.log('sending message', m)
    ws.send(JSON.stringify(m))
}

ws.onmessage = (event) => {
    console.log(event.data)
}