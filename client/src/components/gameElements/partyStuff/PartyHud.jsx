import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class PartyHud extends React.Component {
	constructor(props) {
		super(props)
		console.log()
		this.state = { error: '' }
	}

	handleSubmit = e => {
		e.preventDefault()
		if (e.target.partyMessage.value !== '') {
			this.props.sendChatMessage(e.target.partyMessage.value)
			e.target.partyMessage.value = ''
		}
	}

	render() {
		return (
			<Container className='w-100 d-flex flex-column mx-5'>
				<Container className='d-flex'>
					<h4 className='w-50  mx-5'>You are in: {this.props.partyName}</h4>
					<Button onClick={this.props.leaveParty}>Leave</Button>
				</Container>

				<Container className='party-messages w-100'>
					{this.props.messages?.map((message, i) => {
						return (
							<p key={i}>
								{message.from}: {message.message}
							</p>
						)
					})}
					<Form onSubmit={this.handleSubmit}>
						<Form.Group
							className='mb-3'
							style={{ display: 'flex', flexDirection: 'column' }}
							controlId='partyMessage'
						>
							<Form.Label style={{ textAlign: 'left' }} className='m-3'>
								Message
							</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter message'
								className='w-100'
							/>
							<Form.Text className='text-muted text-start text-light'>
								{this.state.error
									? this.state.error
									: 'Everyone with this unique* party name will see your messages!'}
							</Form.Text>
						</Form.Group>
					</Form>
				</Container>
			</Container>
		)
	}
}

export default PartyHud
