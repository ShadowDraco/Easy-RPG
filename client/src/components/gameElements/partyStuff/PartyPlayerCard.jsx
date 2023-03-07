import React from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-bootstrap/Modal'

import Accordion from 'react-bootstrap/Accordion'

class PartyPlayerCard extends React.Component {
	constructor(props) {
		super(props)

		// don't hard code this later
		this.props.authorizedPlayer.maxHealth = 150
		this.state = {
			showInventory: false,
		}
	}

	handleInputChange = () => {}

	handleShowInventory = () => {
		this.setState({
			showInventory: !this.state.showInventory,
		})
	}

	render() {
		return (
			<>
				<Card className='player'>
					<Card.Header>{this.props.authorizedPlayer.username}</Card.Header>
					<Card.Body>
						<p>Class: this.props.authorizedPlayer.class</p>

						<ProgressBar
							now={
								(this.props.authorizedPlayer.stats.health /
									this.props.authorizedPlayer.maxHealth) *
								100
							}
							variant='success'
						/>
						{/* <section className='player_actions'>
            <Button onClick={this.handleShowInventory}>Attack</Button>
            <Button onClick={this.handleShowInventory}>Inventory</Button>
            <Button onClick={this.handleShowInventory}>Run</Button>
          </section> */}
					</Card.Body>
				</Card>

				<Modal
					show={this.state.showInventory}
					onHide={this.handleShowInventory}
					centered
				>
					<Modal.Header>Inventory</Modal.Header>
					<Modal.Body>
						<Accordion>
							<Accordion.Item eventKey='0'>
								<Accordion.Header>Potion of Placeholding</Accordion.Header>
								<Accordion.Body>
									This potion does absolutely nothing but act as a placeholder
									for other items
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey='1'>
								<Accordion.Header>Health Potion</Accordion.Header>
								<Accordion.Body>
									This is where my health potion would go... IF I HAD ONE!
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default PartyPlayerCard
