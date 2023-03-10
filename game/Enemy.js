const randomFromTo = require('./lib/helperFunctions/RandomFromTo')

const enemyTypes = ['Alien Orcs','Normal Skeleton', 'Alien Skeleton', 'Alien Zombie', 'Space Goblin', 'Space Slime', 'Alien Elves', 'Golems', 'Underground Space Monkey', 'Outer Space Lizard' ]
const classTypes = ['Barbarian', 'Assassin', 'Warrior', 'Ranger', 'Bard', 'Black Mage', 'Samurai', 'Ninja', 'Bandit', 'Pirate', 'Sniper', 'Witch Doctor']
class Enemy {
	constructor() {
		this.generateEnemy()
	}

	generateEnemy = () => {
		this.name = enemyTypes[randomFromTo(0, enemyTypes.length - 1)]
		this.health = randomFromTo(50, 100)
		this.class = classTypes[randomFromTo(0, classTypes.length - 1)]
	}
}

module.exports = Enemy
