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
			maxHealth: 100,
			inventory: [
				{
					name: 'Potion of Placeholding',
					description: 'This potion does nothing but take up inventory space',
					amount: 99,
				},
				{
					name: 'Health Potion',
					description: 'Heals the player for 10 - 30 HP',
					amount: this.props.authorizedPlayer.stats.potions,
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
			maxHealth: 100,
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
					<Card.Header
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						<div style={{ paddingRight: '5px' }}>
							{this.props.authorizedPlayer.username}{' '}
						</div>
						<Button size='sm' onClick={this.handleEditCharacter}>
							Edit
						</Button>
					</Card.Header>

					<Card.Body>
						<p>Class: {this.props.authorizedPlayer.class}</p>
						<p>
							Highest Gold:{' '}
							<span className='gold'>
								{this.props.authorizedPlayer.stats.gold} /
								{this.props.highestGold}
							</span>
						</p>

						
						<ProgressBar
							now={this.props.authorizedPlayer.stats.health}
							max={this.state.maxHealth}
							label={`${this.props.authorizedPlayer.stats.health} / ${this.state.maxHealth}`}
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
							<Form.Select type='option' id='character_class' className='my-2'>
								<option value='Astrological Archer'>Astrological Archer</option>
								<option value='Galactic Barbarian'>Galactic Barbarian</option>
								<option value='Interstellar Druid'>Interstellar Druid</option>
								<option value='Cosmic Rouge'>Cosmic Rouge</option>
								<option value='Solar Warrior'>Solar Warrior</option>
								<option value='Space Wizard'>Space Wizard</option>
							</Form.Select>
							<Button type='submit'>Save</Button>
							<Button
								className='mx-5 my-3 reset-character'
								href='/'
								onClick={this.props.resetPlayer}
							>
								Reset your character
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	}
}

export default withAuth0(PlayerCard)
