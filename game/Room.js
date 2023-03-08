const Enemy = require('./Enemy')
class Room {
	constructor(type, index) {
		this.type = type
		this.treasure = []
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
			this.descriptionElements = ['Danger', 'Enemies', 'Loot?', 'Fun']
		}

		if (this.type === 'treasure') {
			this.enemies.push(new Enemy())
			this.treasure.push('gold')
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
