import React from 'react'
import Container from 'react-bootstrap/Container'
import { withAuth0 } from '@auth0/auth0-react'

import PlayerCard from '../gameElements/PlayerCard'
import EnemyCard from '../gameElements/EnemyCard'
import PlayerMenu from '../gameElements/playerMenus/PlayerMenu'

import axios from 'axios'

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
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
			console.log(authorizedPlayer.data)
			this.setState({ authorizedPlayer: authorizedPlayer.data })
		}
	}

	render() {
		return (
			<>
				{this.props.auth0.isAuthenticated ? (
					<Container id='game_screen'>
						<section id='encounter_screen'>
							<EnemyCard />
						</section>
						{this.state.authorizedPlayer ? (
							<section id='player_screen'>
								<div id='party_members'>
									<PlayerCard authorizedPlayer={this.state.authorizedPlayer} />
									{/* // get other player names from the SOCKET */}
									{/* if party session render more players */}
									{this.state.inParty ? (
										<>
											<PartyPlayerCard />
											<PartyPlayerCard />
										</>
									) : (
										''
									)}
								</div>
								<PlayerMenu />
							</section>
						) : (
							'Player is coming out of the dungeon!'
						)}
						{/* <h1>Create your character {this.props.auth0.user.name}!</h1> */}
					</Container>
				) : (
					<NotAuthenticated />
				)}
			</>
		)
	}
}

export default withAuth0(Game)
