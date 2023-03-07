const Room = require('./Room')
const randomFromTo = require('./lib/helperFunctions/RandomFromTo')
class Map {
	constructor() {
		this.roomTypes = ['enemy', 'treasure', 'empty']
		this.rooms = []
		this.generateMap(randomFromTo(5, 10))
	}

	generateMap = size => {
		for (let i = 0; i < size; i++) {
			this.rooms.push(
				new Room(this.roomTypes[randomFromTo(0, this.roomTypes.length)])
			)
		}
	}
}

module.exports = Map
