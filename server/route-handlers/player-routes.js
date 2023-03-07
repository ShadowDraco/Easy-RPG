const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const Map = require('../game/Map')

const PlayerModel = require('../Models/player')

router.get('/', (request, response) => {
	console.log('player route accessed')
	response.send('Player Route').status(200)
})

router.get('/get', async (request, response, next) => {
	const user = request.user

	try {
		const player = await PlayerModel.findOne({ email: user.email })

		if (player !== null) {
			response.status(200).send(player)
		} else {
			createNewPlayer(user.email, user.name)
			response.status(200).send(player)
		}

		/*{
            email,
            username,
            stats: { health, etc....}
        } */
	} catch (error) {
		console.log('error getting user')
		next()
	}
})

router.get('/new-map', async (request, response) => {
	console.log('creating a new map')
	const newMap = createNewMap()
	console.log(newMap ? true : false)
	try {
		let updatedPlayer = await PlayerModel.findOneAndUpdate(
			{ email: request.user.email },
			{ map: newMap },
			{ new: true }
		)

		response.status(200).send(updatedPlayer)
	} catch (error) {
		console.log('error adding map to player')
		next()
	}
})

createNewMap = () => {
	return new Map()
}

createNewPlayer = async (email, username) => {
	const Player = await PlayerModel.create({
		email: email,
		username: username,
		stats: { health: 100, gold: 10, AP: 15 },
	})
}

router.post('/new', async (request, response) => {
	let email = request.body.email
	let username = request.body.username

	createNewPlayer(email, username)

	response.send('New Player Created').status(200)
})

module.exports = router
