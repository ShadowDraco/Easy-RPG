const randomFromTo = require('./lib/helperFunctions/RandomFromTo')

const enemyTypes = ['Skeleton', 'Zombie', 'Goblin']
class Enemy {
	constructor() {
		this.generateEnemy()
	}

	generateEnemy = () => {
		this.name = enemyTypes[randomFromTo(0, enemyTypes.length - 1)]
		this.health = 100
	}
}

module.exports = Enemy
