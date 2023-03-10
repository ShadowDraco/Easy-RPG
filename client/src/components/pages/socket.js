import io from 'socket.io-client'

const URL = 'https://easy-rpg-backend.herokuapp.com/'

const socket = io('http://localhost:3001')

// create a socket connection function

socket.on('connect', () => console.log('connected to socket'))
socket.on('connect_error', error => {
	console.log('connect error')
	socket.disconnect()
})

export default socket
