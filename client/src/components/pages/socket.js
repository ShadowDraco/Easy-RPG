import io from 'socket.io-client'

const URL = 'https://easy-rpg.herokuapp.com/:3000'

const socket = io(URL, {
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
