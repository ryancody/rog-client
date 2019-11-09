const ee = require('./EventManager').emitter

exports.process = (message) => {

    try{
        message = this.parse(message)
    } catch (e) {
        console.log('could not parse:\n', message)
        return
    }

    switch (message.type) {

        case 'GET_USER_INFO':
            ee.emit('SUBMIT_USER_INFO')
            break

        case 'ADD_TO_GAME':
            ee.emit('JOIN_GAME')
            break

        default:
            console.log('from server:', message)
            break
    }
}

this.parse = (message) => {
    
    try{
        return JSON.parse(message)
    } catch (e) {
        throw e
    }
}