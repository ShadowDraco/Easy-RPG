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
				<Form.Group
					className='mb-3'
					style={{ display: 'flex', flexDirection: 'column' }}
					controlId='partyName'
				>
					<Form.Label style={{ textAlign: 'left' }} className='m-3'>
						Party Name
					</Form.Label>
					<Form.Control type='text' placeholder='Enter name' className='w-25' />
					<Form.Text className='text-muted text-start text-light'>
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
