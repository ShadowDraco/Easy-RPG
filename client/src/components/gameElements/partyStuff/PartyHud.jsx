import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/esm/Button'

class PartyHud extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container>
				<h4>You are in: {this.props.partyName}</h4>
				<Button onClick={this.props.leaveParty}>Leave</Button>
			</Container>
		)
	}
}

export default PartyHud
