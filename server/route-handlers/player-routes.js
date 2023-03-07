
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const PlayerModel = require('../Models/player');

<<<<<<< Updated upstream
router.get('/', (request, response)=> {
    response.send('Player Route response').status(200);
});
=======
router.get('/get', async (request, response, next) => {
	const user = request.user

	try {
		const player = await PlayerModel.findOne({ email: user.email })

		player
			? response.status(200).send(player)
			: createNewPlayer(user.email, user.name)
	} catch (error) {
		console.log('error getting user')
		next()
	}
})

createNewPlayer = async (email, username) => {
	const Player = await PlayerModel.create({
		email: email,
		username: username,
		stats: { health: 100, gold: 10, AP: 15 },
	})
}
>>>>>>> Stashed changes

router.post('/new', async (request, response) => {
    let email = request.body.email
    let username = request.body.username
    const Player = await PlayerModel.create({email: email, username: username});
    response.send('New Player Created').status(200);
});


module.exports = router;