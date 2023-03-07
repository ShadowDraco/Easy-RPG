import React from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-bootstrap/Modal'

import Accordion from 'react-bootstrap/Accordion'

class PlayerCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showInventory: false,
		}
	}

	showTargets = () => {

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

						{/* calculate health percentage out of 100 to display accurate health bar */}
						<ProgressBar
							now={(this.props.authorizedPlayer.stats.health / 150) * 100}
							variant='success'
						/>
					</Card.Body>
				</Card>

				<Modal
					show={this.props.showInventory}
					onHide={this.props.handleShowInventory}
					centered
					key='player_inventory'
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

export default PlayerCard
