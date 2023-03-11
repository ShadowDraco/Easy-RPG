const Room = require('./Room')
const randomFromTo = require('./lib/helperFunctions/RandomFromTo')

const roomTypes = ['enemy', 'treasure', 'empty']

class Map {
	constructor() {
		this.rooms = []
		this.rooms[0] = new Room('starter', 0)

		this.choosingNextRoom = true
		this.inFight = false

		this.generateMap(randomFromTo(3, 5))
	}

	generateMap(size) {
		for (let index = 1; index < size; index++) {
			this.rooms.push(
				new Room(roomTypes[randomFromTo(0, roomTypes.length - 1)], index)
			)
		}
	}

	getPresentableRooms() {
		let roomsToPresent = this.rooms.filter(
			room => !room.cleared && room.type !== 'starter'
		)

		this.presentableRooms = roomsToPresent.slice(0, 2)
	}
}

module.exports = Map
