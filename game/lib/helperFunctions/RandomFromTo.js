const randomFromTo = (from, to) => {
	// return a random number from (min) to (max) (inclusive)
	return Math.round(Math.random() * (to - from)) + from
}

module.exports = randomFromTo
