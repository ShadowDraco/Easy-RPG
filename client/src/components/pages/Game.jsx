import React from 'react'
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container'
import { withAuth0 } from '@auth0/auth0-react'

import PlayerCard from '../gameElements/PlayerCard'
import EnemyCard from '../gameElements/EnemyCard'
import PlayerMenu from '../gameElements/playerMenus/PlayerMenu'

import axios from 'axios'
import StartAParty from '../gameElements/partyStuff/StartAParty'
import PartyHud from '../gameElements/partyStuff/PartyHud'
import socket from './socket'
import Button from 'react-bootstrap/esm/Button'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inAParty: false,
			showInventory: false,
		}
	}

	// get the user
	async componentDidMount() {
		if (this.props.auth0.isAuthenticated) {
			const res = await this.props.auth0.getIdTokenClaims()

			const jwt = res.__raw
			const config = {
				headers: { Authorization: `Bearer ${jwt}` },
				method: 'get',
				baseURL: `${import.meta.env.VITE_SERVER_URL}`,
				url: '/player/get',
			}

			const authorizedPlayer = await axios(config)

			this.setState({ authorizedPlayer: authorizedPlayer.data })
		}
	}

	// Socket Stuff

	createOrStartAParty = partyName => {
		this.setState({ inAParty: true, partyName: partyName })
		// join a room
		socket.connect()
	}

	sendChatMessage = () => {
		//
	}

	updateParty = () => {
		// get new data to display
	}

	leaveParty = () => {
		socket.disconnect('left party')
		this.setState({ inAParty: false, partyName: '' })
	}

	getNewMap = async () => {
		const res = await this.props.auth0.getIdTokenClaims()

		const jwt = res.__raw
		const config = {
			headers: { Authorization: `Bearer ${jwt}` },
			method: 'get',
			baseURL: `${import.meta.env.VITE_SERVER_URL}`,
			url: '/player/new-map',
		}

		axios(config).then(response => {
			console.log(response)
		})
	}

	// end socket

	handleAttackEnemy = () => {
		console.log(document.getElementById())
	}

	handleShowInventory = () => {
		this.setState({
			showInventory: !this.state.showInventory,
		})
	}

	render() {
		return (
			<>
				{this.props.auth0.isAuthenticated ? (
					<Container id='game_screen'>
						<section id='party_screen'>
							{!this.state.inAParty ? (
								<StartAParty createOrStartAParty={this.createOrStartAParty} />
							) : (
								<PartyHud
									partyName={this.state.partyName}
									leaveParty={this.leaveParty}
								/>
							)}
						</section>

						<section id='encounter_screen'>
							<EnemyCard />
						</section>
						{this.state.authorizedPlayer ? (
							<section id='player_screen'>
								<div id='party_members'>
									<PlayerCard
										authorizedPlayer={this.state.authorizedPlayer}
										key='my_player'
										showInventory={this.state.showInventory}
										handleShowInventory={this.handleShowInventory}
									/>
									{/* // get other player names from the SOCKET */}
									{/* if party session render more players */}
									{this.state.inAParty ? (
										<>
											{/* <PartyPlayerCard /> */}
											{/* <PartyPlayerCard /> */}
										</>
									) : (
										''
									)}
								</div>
								<PlayerMenu handleShowInventory={this.handleShowInventory} />
							</section>
						) : (
							'Player is coming out of the dungeon!'
						)}
						{/* <h1>Create your character {this.props.auth0.user.name}!</h1> */}

						<Button onClick={this.getNewMap}>get new map</Button>
					</Container>
				) : (
					<NotAuthenticated />
				)}
			</>
		)
	}
}

export default withAuth0(Game)
