import io from 'socket.io-client'

const URL = 'http://localhost:3000/'

const socket = io('https://easy-rpg-backend.herokuapp.com/').connect()

// create a socket connection function

socket.on('connect', () => console.log('connected to socket'))
socket.on('connect_error', error => {
	console.log('connect error')
	socket.disconnect()
})

export default socket
