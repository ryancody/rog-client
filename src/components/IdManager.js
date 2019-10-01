import Cookies from 'universal-cookie'
let crypto = require('crypto')
let cookies = new Cookies()

const uuidv1 = require('uuid/v1')
const PLAYER_ID = 'PLAYER_ID'

export function getId () {

    if(!cookies.get(PLAYER_ID)) {
        /* use random hash for ease of testing, switch to UUID in production */
        // cookies.set(PLAYER_ID, uuidv1())
        cookies.set(PLAYER_ID, randomHash())
    }

    console.log('player id', cookies.get(PLAYER_ID))

    return cookies.get(PLAYER_ID)
}

export function clearId () {
    cookies.remove(PLAYER_ID)
}

export function randomHash () {
    return crypto.createHash('md5').update(new Date().getTime().toString()).digest("hex").substr(0,6)
}