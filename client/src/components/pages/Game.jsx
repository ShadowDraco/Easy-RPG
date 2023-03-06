import React from 'react'
import Container from 'react-bootstrap/Container'
import { withAuth0 } from '@auth0/auth0-react'
import NotAuthenticated from '../auth0/NotAuthenticated'

class Game extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<>
				{this.props.auth0.isAuthenticated ? (
					<Container>
						<h1>Create your character {this.props.auth0.user.name}!</h1>
					</Container>
				) : (
					<NotAuthenticated />
				)}
			</>
		)
	}
}

export default withAuth0(Game)
