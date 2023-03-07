
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const PlayerModel = require('../Models/player');

router.get('/', (request, response)=> {
    response.send('Player Route response').status(200);
});

router.post('/new', async (request, response) => {
    let email = request.body.email
    let username = request.body.username
    const Player = await PlayerModel.create({email: email, username: username});
    response.send('New Player Created').status(200);
});


module.exports = router;