import React from 'react'

import Container from 'react-bootstrap/Container'
import AuthenticateButtons from '../auth0/AuthenticateButtons'

import { withAuth0 } from '@auth0/auth0-react'

class Welcome extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='my-3'>
				<h1>Welcome</h1>
				<AuthenticateButtons />
			</Container>
		)
	}
}

export default withAuth0(Welcome)
