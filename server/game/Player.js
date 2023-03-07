/* 
class Player {
	//client
	name
	health

	// server - get and create and put (update) - if they die reset stats instead of deleting
	name
	health

    app.use('/player', playerRouter) 

    router.get('/stats/:id' ...)
    router.put('/update-stats/:id' ...)
    router.post('/new-player/:id' ...)
    router.put('/reset-player/:id')

    app.use('/map', mapRouter)

    router.put('/new' ... => {
        // the client passes a map it created into the database through this request

        let player PlayerModel.find({playerId})
        player.map = req.body.newMap // save the map
    })

    PlayerSchema { {
        name: req.body.playerName,
        class: basic, 
        stats: {
            health: 10
            attack: 1
            luck: 4
        },
        map: {room1: {enemy: {
            health 
            attack
        },
    treasure: {
        items: {
            sword,
            stick
        },
        gold: 50
    },
descriptionElemnts: {
    slime, rocks, tattered
}}}


    }
}

*/


