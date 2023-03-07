const Room = require('./Room')
const randomFromTo = require('./lib/helperFunctions/RandomFromTo')

const roomTypes = ['enemy', 'treasure', 'empty']
class Map {
	constructor() {
		this.rooms = []
		this.generateMap(randomFromTo(5, 10))
	}

	generateMap = size => {
		for (let i = 0; i < size; i++) {
			this.rooms.push(
				new Room(roomTypes[randomFromTo(0, roomTypes.length - 1)])
			)
		}
	}
}

module.exports = Map
