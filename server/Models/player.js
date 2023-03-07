'use strict'

const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    email: {type: String, require: true},
    username: {type: String, required:true},
    stats: {
        health: Number,
        gold: Number,
        AP: Number,
    }
})

module.exports = mongoose.model('PlayerModel', PlayerSchema);