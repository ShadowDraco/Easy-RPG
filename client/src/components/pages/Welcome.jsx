import React from 'react'

import Container from 'react-bootstrap/Container'
import LoginButton from '../auth0/LoginButton'

import { withAuth0 } from '@auth0/auth0-react'
import Button from 'react-bootstrap/Button'

class Welcome extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='welcome my-5'>
				<h1 className='my-5'>Welcome</h1>
				{!this.props.auth0.isAuthenticated ? (
					<LoginButton />
				) : (
					<Button href='/game'>To the dungeon!</Button>
				)}
			</Container>
		)
	}
}

export default withAuth0(Welcome)
