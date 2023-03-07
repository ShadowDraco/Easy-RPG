const Enemy = require('./Enemy')
class Room {
	constructor(type) {
		this.type = type
		this.treasure = []
		this.enemies = []
		this.descriptionElements = []
		this.cleared = false
		this.generateRoom()
	}

	generateRoom = () => {
		if (this.type === 'enemy') {
			// random between 1-3
			this.enemies.push(new Enemy())

			this.enemies.push(new Enemy())
			this.enemies.push(new Enemy())
		}

		if (this.type === 'treasure') {
			this.enemies.push(new Enemy())
			this.treasure.push('gold')
		}

		if (this.type === 'starter') {
			this.descriptionElements = ['Tutorial: Click on a room to move forward']
		}
	}
}

module.exports = Room
