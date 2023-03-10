import React from 'react'
import Container from 'react-bootstrap/Container'

class NotAuthenticated extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container>
				<a href='/'>
					<h1>Please log in to continue!</h1>
				</a>
			</Container>
		)
	}
}

export default NotAuthenticated
