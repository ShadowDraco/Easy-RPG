
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL).then(console.log('Database connected'));

app.get('/', (request, response) => {
    response.status(200).send("You've enter the dungeon");
    console.log("Dungeon running on 3001");
})

const PlayerRoute = require('./route-handlers/player-routes');

app.use('/player', PlayerRoute);

app.use('*', (request, response) => {
    response.status(404).send('You entered the wrong corridor!');
});



app.use((error, request, response, next) => {
    response.status(500).send(`We miss placed the dungeon... ${error.message}`);
});

app.listen(port, console.log(`Begin dungeon crawling on port: ${port}`));

