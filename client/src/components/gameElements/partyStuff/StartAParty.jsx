import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class StartAParty extends React.Component {
	constructor(props) {
		super(props)
		console.log()
		this.state = {}
	}

	handleSubmit = e => {
		e.preventDefault()

		if (e.target.partyName.value.length > 4) {
			this.setState({ error: '' })
			let partyName = e.target.partyName.value
			this.props.createOrStartAParty(partyName)
		} else {
			this.setState({
				error: 'the name needs to be greater than 4 characters please!',
			})
		}
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group className='mb-3' controlId='partyName'>
					<Form.Label>Party Name</Form.Label>
					<Form.Control type='text' placeholder='Enter name' />
					<Form.Text className='text-muted'>
						{this.state.error
							? this.state.error
							: 'Everyone with this unique* party name will join you!'}
					</Form.Text>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Start a party!
				</Button>
			</Form>
		)
	}
}

export default StartAParty
