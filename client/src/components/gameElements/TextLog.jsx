import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'

class TextLog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			log: [],
		}
	}

	addToLog = () => {
		let newLog = [this.props.textAddedToLog, ...this.state.log]

		this.setState({
			log: newLog,
		})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.textAddedToLog !== this.props.textAddedToLog) {
			this.addToLog()
		}
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
			<>
				<Container id='text_log' style={{ textAlign: 'left' }}>
					<Container id='text_log_messages'>
						{this.state.log.map((element, i) => (
							<p
								key={i}
								style={{ margin: '0.25rem 0' }}
								className={element.colored ? 'coloredTextLog' : ''}
							>
								{element.text}
							</p>
						))}
					</Container>

					<Container id='chat_submit'>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group
								className='mb-3'
								style={{ display: 'flex', flexDirection: 'column' }}
								controlId='partyMessage'
							>
								<Form.Control
									type='text'
									placeholder='Enter message'
									className='w-100'
								/>
							</Form.Group>
						</Form>
					</Container>
				</Container>
			</>
		)
	}
}

export default TextLog
