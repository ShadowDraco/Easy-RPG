import React from 'react'

import Container from 'react-bootstrap/Container'
import LoginButton from '../auth0/LoginButton'

import { withAuth0 } from '@auth0/auth0-react'

class Welcome extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='my-5'>
				<h1 className='my-5'>Welcome</h1>
				{!this.props.auth0.isAuthenticated && <LoginButton />}
			</Container>
		)
	}
}

export default withAuth0(Welcome)
