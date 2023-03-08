const Enemy = require('./Enemy')
const randomFromTo = require('./lib/helperFunctions/RandomFromTo')
class Room {
	constructor(type, index) {
		this.type = type
		this.treasure = { gold: 0 }
		this.enemies = []
		this.descriptionElements = []
		this.cleared = false
		this.index = index
		this.generateRoom()
	}

	generateRoom = () => {
		if (this.type === 'enemy') {
			// random between 1-3
			this.enemies.push(new Enemy())

			this.enemies.push(new Enemy())
			this.enemies.push(new Enemy())
			this.treasure.gold = randomFromTo(1, 3)
			this.descriptionElements = ['Danger', 'Enemies', 'Loot?', 'Fun']
		}

		if (this.type === 'treasure') {
			this.enemies.push(new Enemy())
			this.treasure.gold = randomFromTo(5, 10)
			this.descriptionElements = ['Gold', 'Treasure', 'Traps?']
		}

		if (this.type === 'starter') {
			this.descriptionElements = ['Tutorial: Click on a room to move forward']
		}
		if (this.type === 'empty') {
			this.descriptionElements = [
				'This is an empty room! Click on a room to move forward',
			]
		}
	}
}

module.exports = Room
