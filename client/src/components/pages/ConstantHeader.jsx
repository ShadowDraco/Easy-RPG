import React from 'react'
import Container from 'react-bootstrap/Container'
import LogoutButton from '../auth0/LogoutButton'
import { withAuth0 } from '@auth0/auth0-react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

class ConstantHeader extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Navbar className='Navbar p-3' bg='dark' variant='dark'>
				<Container className='my-5 p-2'>
					<Navbar.Brand href='/'>Easy-RPG</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav p-3'>
						<Nav className='Nav p-3'>
							<Nav.Link href='/'>Home</Nav.Link>
							<Nav.Link href='/about'>About Us</Nav.Link>
							<NavDropdown title='Account' id='basic-nav-dropdown'>
								<NavDropdown.Item>
									<Button onClick={this.props.updateImage}>Change Theme</Button>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Button onClick={this.props.updateFilter}>
										Change Filter
									</Button>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<LogoutButton />
								</NavDropdown.Item>
							</NavDropdown>

							{/* add nav item button that calls this.props.updateBackgroundImage */}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		)
	}
}

export default withAuth0(ConstantHeader)
