const express = require('express')
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT
const verifyUser = require('./auth/authorize.js')

// socket io stuff //////////////////////////////

const socketIo = require('socket.io')
const io = socketIo(3000, {
	cors: {
		origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
	},
})

// when a socket connects to the server
io.on('connection', socket => {
	console.log('client connected: ', socket.id)

	socket.on('join-room', partyName => {
		try {
			socket.join(partyName)
			console.log('success!')
		} catch (error) {
			console.log('error joining room', partyName)
		}

		socket.on('receive-message', (from, message) => {
			console.log('receiving message', from, message)
		})
	})

	socket.on('send-message', (partyName, playerName, message) => {
		console.log(partyName, playerName, message)
		console.log('sending message to party', partyName)
		io.to(partyName).emit('receive-message', playerName, message)
	})

	socket.on('disconnect', reason => {
		console.log(reason)
	})
})

// all routes after will have the requesting socket
app.use((request, response, next) => {
	request.io = io
	return next()
})

// socket io stuff //////////////////////////////

mongoose
	.connect(process.env.DATABASE_URL)
	.then(console.log('Database connected'))

// This will run the "verify" code on every route automatically
// If the user is valid, we'll have them in request.user in every route!
// If not, it'll throw an error for us
// all routes after will have the verified user
app.use(verifyUser)

app.get('/', (request, response) => {
	response.status(200).send("You've enter the dungeon")
	console.log('Dungeon running on 3001')
})

const PlayerRoute = require('./route-handlers/player-routes')

app.use('/player', PlayerRoute)

app.use('*', (request, response) => {
	response.status(404).send('You entered the wrong corridor!')
})

app.use((error, request, response, next) => {
	response.status(500).send(`We miss placed the dungeon... ${error.message}`)
})

app.listen(port, console.log(`Begin dungeon crawling on port: ${port}`))

function getPresentableRooms(roomsArg) {
	console.log('getting Presentable rooms')

	let rooms = roomsArg
	let roomsToPresent = rooms.filter(
		room => !room.cleared && room.type !== 'starter'
	)
	console.log(roomsToPresent.slice(0, 2))

	return roomsToPresent.slice(0, 2)
}
