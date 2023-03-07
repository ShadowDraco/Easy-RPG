const Room = require('./Room');
const randomFromTo = require('./lib/helperFunctions/RandomFromTo');

const roomTypes = ['enemy', 'treasure', 'empty']

class Map {
	constructor() {
	
		this.rooms = []

		this.generateMap(randomFromTo(5, 10))
	}

	generateMap = size => {
		for (let i = 0; i < size; i++) {
			this.rooms.push(
				new Room(roomTypes[randomFromTo(0, roomTypes.length)])
			)
		}
	}
};


getPresentableRooms = () => {
	roomsToPresent = this.rooms.filter(room => !room.cleared)
	return roomsToPresent
}

module.exports = Map

/* 
/// client

user loads game 

server sends the user their current position 

user starts in starting room

- user requests to database async what rooms they can go into

- user selects a room to go into

- user does something in that room that turns room.cleared
-  to true updates the database map.rooms[playerPosition] = updatedRoom

user gets new rooms to select until all rooms are cleared

selectRoom = () => {
	
}

attackEnemy = () => {

	if (allPlayersAttacked) {

		await put('server/attackEnemy', {updatedEnemies, newPlayerHealth, roomCleared? }) {

		}

	}
}

/// server 


playerPosition

getPresentableRooms => {
 map { rooms { 0 1 (2) 3 (4) 5 }}
\   |   /
 |  |  |

	 roomsToPresent = getPresentableRooms = () => {
		this.rooms.filter(room => !room.cleared}

	})
	return roomsToPresent
 }
}

router.get('/attack-enemy') => {
	await PlayerModel.findOneAndUpdate(request.user, {
			health = newPlayerHealth
			map.rooms[playerPosition].enemies = newEnemies
		}, {new: true})

		res.send(updatedPlayer.map.rooms[playerPosition])
}


*/

