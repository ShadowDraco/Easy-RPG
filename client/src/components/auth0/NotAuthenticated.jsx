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
				<a href='http://127.0.0.1:5173/'>
					<h1>Please log in to continue!</h1>
				</a>
			</Container>
		)
	}
}

export default NotAuthenticated
