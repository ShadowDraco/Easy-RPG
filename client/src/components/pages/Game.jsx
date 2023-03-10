import React from 'react'

import Container from 'react-bootstrap/Container'
import { withAuth0 } from '@auth0/auth0-react'

import PlayerCard from '../gameElements/PlayerCard'
import EnemyCard from '../gameElements/EnemyCard'
import PlayerMenu from '../gameElements/playerMenus/PlayerMenu'

import axios from 'axios'

import socket from './socket'
import Button from 'react-bootstrap/esm/Button'

import GameOver from '../gameElements/GameOver'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inAParty: false,
			showInventory: false,
			enemyDeathCount: 0,
			showEnemies: false,
			inFight: false,
			gettingLoot: false,
			choosingNextRoom: true,
			roomsToChoose: '',
			textAddedToLog: '',
			highestGold: 0,
			messages: [
				{ from: 'Server', message: 'connected!' },
				{ from: 'Server', message: 'connected!' },
				{ from: 'Server', message: 'connected!' },

				{ from: 'Server', message: 'connected!' },

				{ from: 'Server', message: 'connected!' },

				{ from: 'Server', message: 'connected!' },
			],
		}
	}

	getRoomDescription = thing => {
		let roomDescriptionPrefixes = [
			`This room is dimly lit... you see something that vaguely looks like ${thing} on the other side.`,
			`This room has a wretched odor. In the distance you see some ${thing} , but is it worth trying to obtain?`,
			`Piles of bones lie scattered on the floor and old bloodstains cover the walls... you see what looks like ${thing} in a pile of remains. `,
			`The air is cold and stale.. you feel uneasy at the sight of the ${thing} lying out in the open. Tread carefully. `,
			`You see tattered walls and some ${thing} through a pale haze. You  begin to feel a bit nauseous. You probably should not linger here long.`,
		]

		return roomDescriptionPrefixes[
			Math.floor(Math.random() * roomDescriptionPrefixes.length)
		]
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

			const playerAndRoom = await axios(config)

			this.setState({
				authorizedPlayer: playerAndRoom.data.player,
				room: playerAndRoom.data.room,
				presentableRooms: playerAndRoom.data.presentableRooms,
				highestGold: playerAndRoom.data.player.highestGold,
			})
		}
	}

	resetPlayer = async () => {
		if (this.props.auth0.isAuthenticated) {
			const res = await this.props.auth0.getIdTokenClaims()

			console.log(this.state.authorizedPlayer)
			const jwt = res.__raw
			const config = {
				headers: { Authorization: `Bearer ${jwt}` },
				method: 'put',
				data: { oldPlayer: this.state.authorizedPlayer },
				baseURL: `${import.meta.env.VITE_SERVER_URL}`,
				url: '/player/reset-player',
			}

			const playerAndRoom = await axios(config)

			this.setState({
				authorizedPlayer: playerAndRoom.data.player,
				room: playerAndRoom.data.room,
				presentableRooms: playerAndRoom.data.presentableRooms,
				highestGold: playerAndRoom.data.player.highestGold,
			})
		}
	}

	playerMove = async (indexOfOldRoom, indexOfChosenRoom) => {
		const res = await this.props.auth0.getIdTokenClaims()

		const jwt = res.__raw
		const config = {
			headers: { Authorization: `Bearer ${jwt}` },
			method: 'put',
			data: { oldIndex: indexOfOldRoom, index: indexOfChosenRoom },
			baseURL: `${import.meta.env.VITE_SERVER_URL}`,
			url: '/player/move',
		}

		axios(config).then(response => {
			if (response.data.clearedFloor) {
				this.updateTextLog(
					'You begin to enter a new floor of the dungeon...',
					true
				)
				this.setState({
					authorizedPlayer: response.data.updatedPlayer,
					presentableRooms: response.data.newPresentableRooms,
					room: response.data.room,
					choosingNextRoom: true,
					inFight: false,
					highestGold: response.data.updatedPlayer.highestGold,
				})
			} else {
				this.updateTextLog('This room looks clear!', false)
				this.setState({
					authorizedPlayer: response.data.updatedPlayer,
					presentableRooms: response.data.newPresentableRooms,
					highestGold: response.data.updatedPlayer.highestGold,
				})
			}
		})
	}

	getRoomDescription = thing => {
		let roomDescriptionPrefixes = [
			`This room is dimly lit... you see something that vaguely looks like ${thing} on the other side.`,
			`This room has a wretched odor. In the distance you see some ${thing} , but is it worth trying to obtain?`,
			`Piles of bones lie scattered on the floor and old bloodstains cover the walls... you see what looks like ${thing} in a pile of remains. `,
			`The air is cold and stale.. you feel uneasy at the sight of the ${thing} lying out in the open. Tread carefully. `,
			`You see tattered walls and some ${thing} through a pale haze. You  begin to feel a bit nauseous. You probably should not linger here long.`,
		]

		return roomDescriptionPrefixes[
			Math.floor(Math.random() * roomDescriptionPrefixes.length)
		]
	}

	updateTextLog = (text, colored) => {
		this.setState({
			textAddedToLog: { text: text, colored: colored },
		})
	}

	incrementEnemyDeathCount = () => {
		this.setState({
			enemyDeathCount: this.state.enemyDeathCount + 1,
		})
	}

	checkAllEnemiesDead = () => {
		if (this.state.enemyDeathCount === this.state.enemies.length - 1) {
			this.setState({
				gettingLoot: true,
			})
		}
	}

	getLoot = async treasure => {
		const res = await this.props.auth0.getIdTokenClaims()

		const jwt = res.__raw
		const config = {
			headers: { Authorization: `Bearer ${jwt}` },
			method: 'put',
			data: {
				amountOfGold: treasure.gold,
				newPlayerHealth: this.state.authorizedPlayer.stats.health,
			},
			baseURL: `${import.meta.env.VITE_SERVER_URL}`,
			url: '/player/add-gold',
		}

		axios(config).then(response => {
			this.setState({
				inFight: false,
				gettingLoot: false,
				authorizedPlayer: response.data,
				highestGold: response.data.highestGold,
			})
		})
	}

	handleDealDamage = () => {
		let damage = Math.floor(Math.random() * 20) + 10
		// get attacker's ATK
		// get defender's DEF
		// ATK - DEF = Damage Dealt
		// return damage dealt
		this.updateTextLog(`Player deals ${damage} to the enemy!`, false)
		return damage
	}

	doDamageToPlayer = () => {
		let damage = Math.floor(Math.random() * 10)
		setTimeout(() => {
			let newPlayerInfo = this.state.authorizedPlayer

			newPlayerInfo.stats.health = newPlayerInfo.stats.health - damage
			newPlayerInfo.stats.gold = newPlayerInfo.stats.gold + 5

			if (newPlayerInfo.stats.health < 0) {
				newPlayerInfo.stats.health = 0
			}

			this.updateTextLog(`Enemy deals ${damage} damage to the player!`, false)

			this.setState({
				authorizedPlayer: newPlayerInfo,
			})
		}, 1000)
	}

	updateAuthorizedPlayer = responseData => {
		this.setState({ authorizedPlayer: responseData })
	}

	healPlayer = () => {
		let healAmount = Math.round(Math.random() * 20) + 10
		let newPlayerInfo = this.state.authorizedPlayer

		newPlayerInfo.stats.health = newPlayerInfo.stats.health + healAmount

		if (newPlayerInfo.stats.health > 100) {
			newPlayerInfo.stats.health = 100
		}

		this.setState({
			authorizedPlayer: newPlayerInfo,
		})
	}

	handleShowInventory = () => {
		this.setState({
			showInventory: !this.state.showInventory,
		})
	}

	handleEnterNewRoom = async roomInfo => {
		let oldRoomIdx = this.state.room.index

		this.updateTextLog(
			this.getRoomDescription(
				roomInfo.descriptionElements[
					Math.floor(Math.random() * roomInfo.descriptionElements.length)
				].toLowerCase()
			),
			false
		)

		this.setState({
			room: roomInfo,
			choosingNextRoom: false,
			enemies: roomInfo.enemies,
			enemyDeathCount: 0,
			inFight: roomInfo.enemies.length > 0 ? true : false,
		})

		// this.playerMove(roomInfo.index)
		await this.playerMove(oldRoomIdx, roomInfo.index)
	}

	// Socket Stuff

	createOrStartAParty = partyName => {
		this.setState({ inAParty: true, partyName: partyName })
		socket.connect()
		socket.emit('join-room', partyName)
		socket.on('receive-message', (from, message) => {
			console.log('receiving message')
			this.receiveChatMessage(from, message)
		})
	}

	sendChatMessage = message => {
		socket.emit(
			'send-message',
			this.state.partyName,
			this.state.authorizedPlayer.username,
			message
		)
	}

	receiveChatMessage = (from, message) => {
		this.setState({
			messages: [...this.state.messages, { from: from, message: message }],
		})
		this.updateTextLog(`${from}: ${message}`, true)
	}

	leaveParty = () => {
		socket.disconnect('left party')
		this.setState({ inAParty: false, partyName: '' })
	}

	// end socket

	render() {
		return (
			<>
				{this.props.auth0.isAuthenticated ? (
					<Container
						id='game_screen'
						key='game_screen'
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{this.state.authorizedPlayer?.stats.health > 1 && (
							<Container id='encounter_screen' key='encounter_screen'>
								{this.state.inFight ? (
									<>
										{this.state.enemies.map((enemy, i) => (
											<EnemyCard
												key={i}
												id={`enemy_${i}`}
												enemyInfo={enemy}
												incrementEnemyDeathCount={this.incrementEnemyDeathCount}
												handleDealDamage={this.handleDealDamage}
												checkAllEnemiesDead={this.checkAllEnemiesDead}
												doDamageToPlayer={this.doDamageToPlayer}
											/>
										))}

										{this.state.gettingLoot ? (
											<Button
												onClick={() => {
													this.getLoot(this.state.room.treasure)
												}}
											>
												GET LOOT
											</Button>
										) : (
											''
										)}
									</>
								) : (
									<Container
										key='choose_room_container'
										id='choose_room_container'
										style={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<h4>Choose Wisely...</h4>
										<div id='choose_room_options'>
											{this.state.presentableRooms?.map((element, i) => (
												<Button
													key={i}
													room={element}
													onClick={() => {
														this.handleEnterNewRoom(element)
													}}
												>
													Path
												</Button>
											))}
										</div>
									</Container>
								)}
							</Container>
						)}
						{this.state.authorizedPlayer ? (
							<Container id='player_screen' key='player_screen'>
								{this.state.authorizedPlayer.stats.health !== 0 ? (
									<>
										<div id='party_members'>
											<PlayerCard
												updateAuthorizedPlayer={this.updateAuthorizedPlayer}
												authorizedPlayer={this.state.authorizedPlayer}
												key='my_player'
												showInventory={this.state.showInventory}
												handleShowInventory={this.handleShowInventory}
												updateMapInfo={this.updateMapInfo}
												healPlayer={this.healPlayer}
												highestGold={this.state.highestGold}
												currentGold={this.state.authorizedPlayer.stats.gold}
											/>

											{/* // get other player names from the SOCKET */}
											{/* if party session render more players */}
											{
												this.state.inAParty ? (
													<>
														{/* <PartyPlayerCard /> */}
														{/* <PartyPlayerCard /> */}
													</>
												) : null //if no authorized player, dont render any player cards
											}
										</div>

										<PlayerMenu
											playerInfo={this.state.authorizedPlayer}
											textAddedToLog={this.state.textAddedToLog}
											handleShowInventory={this.handleShowInventory}
											handleDealDamage={this.handleDealDamage}
											partyName={this.state.partyName}
											inAParty={this.state.inAParty}
											leaveParty={this.leaveParty}
											sendChatMessage={this.sendChatMessage}
											createOrStartAParty={this.createOrStartAParty}
										/>
									</>
								) : (
									<GameOver
										authorizedPlayer={this.state.authorizedPlayer}
										resetPlayer={this.resetPlayer}
									/>
								)}
							</Container>
						) : (
							'Player is traversing the dungeon!'
						)}
					</Container>
				) : (
					<NotAuthenticated />
				)}
			</>
		)
	}
}

export default withAuth0(Game)
