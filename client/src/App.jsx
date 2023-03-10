import React from 'react'
import { withAuth0 } from '@auth0/auth0-react'
import './App.css'
import './Reset.css'

import Welcome from './components/pages/Welcome'
import Game from './components/pages/Game'

import ConstantHeader from './components/pages/ConstantHeader'
import ConstantFooter from './components/pages/ConstantFooter'

import Container from 'react-bootstrap/Container'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotAuthenticated from './components/auth0/NotAuthenticated'

const imageUrlOne = '/msl.jpg'
const imageUrlTwo = '/msl2.png'

const images = [imageUrlOne, imageUrlTwo]
const filters = ['normal', 'color-dodge']
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			imageNumber: 0,
			filterNumber: 0,
			image: images[0],
			filter: filters[0],
		}
	}

	updateImage = () => {
		if (this.state.imageNumber === 0) {
			this.setState({ imageNumber: 1, image: images[1] })
		} else {
			this.setState({ imageNumber: 0, image: images[0] })
		}
	}

	updateFilter = () => {
		if (this.state.filterNumber === 0) {
			this.setState({ filterNumber: 1, filter: filters[1] })
		} else {
			this.setState({ filterNumber: 0, filter: filters[0] })
		}
	}

	render() {
		return (
			<Container
				fluid
				className='App w-100 p-0 m-0'
				style={{
					backgroundImage: `url(${this.state.image})`,
					backgroundBlendMode: this.state.filter,
				}}
			>
				<Router>
					<ConstantHeader
						updateFilter={this.updateFilter}
						updateImage={this.updateImage}
					/>
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

					<ConstantFooter />
				</Router>
			</Container>
		)
	}
}

export default withAuth0(App)
