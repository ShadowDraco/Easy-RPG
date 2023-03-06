import React from 'react'
import Container from 'react-bootstrap/Container'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

class AuthenticateButtons extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container>
				<h1>Authenticate here</h1>
				<LoginButton />
				<LogoutButton />
			</Container>
		)
	}
}

export default AuthenticateButtons
