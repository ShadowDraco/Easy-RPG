'use strict'

const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
	email: { type: String, require: true },
	username: { type: String, required: true },
	stats: {
		health: Number,
		gold: Number,
		AP: Number,
	},
	map: Object,
	position: Number
})

module.exports = mongoose.model('Player', playerSchema)
