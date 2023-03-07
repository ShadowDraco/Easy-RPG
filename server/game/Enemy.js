const randomFromTo = require('./lib/helperFunctions/RandomFromTo')

class Enemy {
	enemyTypes = ['Skeleton', 'Zombie', 'Goblin']
	constructor() {
		this.generateEnemy()
	}

	generateEnemy = () => {
		this.name = this.enemyTypes[randomFromTo(0, this.enemyTypes.length)]
		this.health = 100
	}
}

module.exports = Enemy
