import io from 'socket.io-client'

const URL = 'https://easy-rpg-backend.herokuapp.com/'

const socket = io({
	autoConnect: false,
})

var mySocketId

// create a socket connection function

socket.on('connect', () => console.log('connected with to socket'))
socket.on('connect_error', () => {
	console.log('connect error')
	socket.disconnect()
})

export default socket
