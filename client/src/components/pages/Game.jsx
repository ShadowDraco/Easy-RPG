import React from 'react'
import Container from 'react-bootstrap/Container'
import { withAuth0 } from '@auth0/auth0-react'
import NotAuthenticated from '../auth0/NotAuthenticated'
import PlayerCard from '../gameElements/PlayerCard'
import EnemyCard from '../gameElements/EnemyCard'

class Game extends React.Component {
	constructor(props) {
		super(props)
<<<<<<< Updated upstream
		console.log()
=======
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

			this.setState({ authorizedPlayer: authorizedPlayer.data })
		}
>>>>>>> Stashed changes
	}

	render() {
		return (
			<>
				{this.props.auth0.isAuthenticated ? (
					<Container id='game_screen'>
						<section id='encounter_screen'>
							<EnemyCard />
						</section>
						<section id='player_screen'>
							<PlayerCard />
						</section>
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
