import React from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import './App.css'
import './Reset.css'

import Welcome from './components/pages/Welcome'
import Game from './components/pages/Game'

import ConstantHeader from './components/pages/ConstantHeader'
import ConstantFooter from './components/pages/ConstantFooter'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotAuthenticated from './components/auth0/NotAuthenticated'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = { count: 0 }
	}
	render() {
		return (
			<>
				<Router>
					<ConstantHeader />

					<Routes>
						<Route exact path='/' element={<Welcome />}></Route>
						<Route
							exact
							path='/game'
							element={
								this.props.auth0.isAuthenticated ? (
									<Game />
								) : (
									<NotAuthenticated />
								)
							}
						></Route>
					</Routes>
					{/* <PlayerCard /> */}

					<ConstantFooter />
				</Router>
			</>
		)
	}
}

export default withAuth0(App)
