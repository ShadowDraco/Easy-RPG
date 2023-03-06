import React from 'react'
import Container from 'react-bootstrap/Container'
import LogoutButton from '../auth0/LogoutButton'
import { withAuth0 } from '@auth0/auth0-react'

class ConstantHeader extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='my-5 flex'>
				<h1>Header</h1>
				{this.props.auth0.isAuthenticated && <LogoutButton />}
			</Container>
		)
	}
}

export default withAuth0(ConstantHeader)
