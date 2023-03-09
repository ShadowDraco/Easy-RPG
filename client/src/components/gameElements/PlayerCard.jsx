import React from 'react'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { withAuth0 } from '@auth0/auth0-react'

class PlayerCard extends React.Component {
	constructor(props) {
		super(props)

		this.playerRef = React.createRef()

		this.state = {
			// showInventory: false,
			showEditCharacter: false,
			maxHealth: 1,
			inventory: [
				{
					name: 'Potion of Placeholding',
					description: 'This potion does nothing but take up inventory space',
					amount: 99,
				},
				{
					name: 'Health Potion',
					description: 'Heals the player for 10 - 30 HP',
					amount: 5,
				},
			],
		}
	}

	showTargets = () => {}

	handleInputChange = () => {}

	// // toggles hide/show of inventory
	// handleShowInventory = () => {
	// 	this.setState({
	// 		showInventory: !this.state.showInventory,
	// 	})
	// }

	// toggles hide/show of edit character modal
	handleEditCharacter = () => {
		this.setState({
			showEditCharacter: !this.state.showEditCharacter,
		})
	}

	handleHealPlayer = itemIdx => {
		let newInventory = this.state.inventory
		newInventory[itemIdx].amount--

		this.setState({
			inventory: newInventory,
		})

		this.props.healPlayer()
		this.props.handleShowInventory()
	}

	// submits new player information

	handleSubmit = async event => {
		event.preventDefault()

		const res = await this.props.auth0.getIdTokenClaims()
		const jwt = res.__raw
		const config = {
			headers: { Authorization: `Bearer ${jwt}`, accept: 'application/json' },
			method: 'post',
			data: {
				pName: event.target.character_name.value,
				pClass: event.target.character_class.value,
			},
			baseURL: `${import.meta.env.VITE_SERVER_URL}`,
			url: '/player/change-info',
		}
		axios(config).then(response => {
			this.props.updateAuthorizedPlayer(response.data)
			this.handleEditCharacter()
		})
	}

	componentDidMount() {
		this.setState({
			maxHealth: this.props.authorizedPlayer.stats.health,
		})
	}

	render() {
		return (
			<>
				<Card
					id={`player_0`}
					className='player'
					onClick={this.props.updateMapInfo}
				>
					<Card.Header>
						{this.props.authorizedPlayer.username}{' '}
						<Button onClick={this.handleEditCharacter}>Edit</Button>
					</Card.Header>
					<Card.Body>
						<p>Class: {this.props.authorizedPlayer.class}</p>

						{/* calculate health percentage out of 100 to display accurate health bar */}
						<ProgressBar
							now={this.props.authorizedPlayer.stats.health}
							max={this.state.maxHealth}
							label={`${this.props.authorizedPlayer.stats.health} / ${this.state.maxHealth}`}
							variant='success'
						/>
					</Card.Body>
				</Card>

				{/* inventory modal  */}
				<Modal
					show={this.props.showInventory}
					onHide={this.props.handleShowInventory}
					centered
					key='player_inventory'
				>
					<Modal.Header>Inventory</Modal.Header>
					<Modal.Body>
						<Accordion>
							{this.state.inventory.map((item, idx) => (
								<Accordion.Item eventKey={idx} key={`${item}_${idx}`}>
									<Accordion.Header>
										{item.name} x{item.amount}
									</Accordion.Header>
									<Accordion.Body>
										{item.name === 'Health Potion' ? (
											<>
												<Button onClick={() => this.handleHealPlayer(idx)}>
													Use
												</Button>{' '}
												{item.description}
											</>
										) : (
											<>
												<Button>Use</Button> {item.description}
											</>
										)}
									</Accordion.Body>
								</Accordion.Item>
							))}
							{/* <Accordion.Item eventKey='0'>
								<Accordion.Header>Potion of Placeholding</Accordion.Header>
								<Accordion.Body>
									This potion does absolutely nothing but act as a placeholder
									for other items
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey='1'>
								<Accordion.Header>Health Potion</Accordion.Header>
								<Accordion.Body>
									<Button onClick={this.props.healPlayer}></Button>This is where my health potion would go... IF I HAD ONE!
								</Accordion.Body>
							</Accordion.Item> */}
						</Accordion>
					</Modal.Body>
				</Modal>

				{/* edit player character modal */}
				<Modal
					show={this.state.showEditCharacter}
					onHide={this.handleEditCharacter}
				>
					<Modal.Header>Edit Character Information</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Control
								type='text'
								id='character_name'
								placeholder='Character Name'
							></Form.Control>
							<Form.Select type='option' id='character_class'>
								<option value='archer'>Archer</option>
								<option value='barbarian'>Barbarian</option>
								<option value='druid'>Druid</option>
								<option value='rouge'>Rouge</option>
								<option value='warrior'>Warrior</option>
								<option value='wizard'>Wizard</option>
							</Form.Select>
							<Button type='submit'>Save</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default withAuth0(PlayerCard)
