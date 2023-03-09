import React from 'react'
import Container from 'react-bootstrap/Container'
class ConstantFooter extends React.Component {
	constructor(props) {
		super(props)
		console.log()
		this.state = {
			currentTime: new Date().getFullYear(),
		}
	}

	render() {
		return (
			<Container fluid className='footer w-100'>
				<section className='main-footer p-1 w-100'>
					<div className='container p-3 w-100'>
						<div className='row w-100'>
							<section className='ul'>
								<div className='col w-100' style={{ display: 'flex' }}>
									<h5 className='w-25'>Dungeons crafted by:</h5>
									<ul
										className='list-unstyled w-100'
										style={{ display: 'flex' }}
									>
										<li className='w-100'>Ethan Storm</li>
										<li className='w-100'>Kawika Miller</li>
										<li className='w-100'>Darran Holmes</li>
									</ul>
								</div>
								<div
									id='column2'
									className='col w-100'
									style={{ display: 'flex' }}
								>
									<h5 className='w-25'>You can find us on:</h5>
									<ul
										className='list-unstyled w-100'
										style={{ display: 'flex' }}
									>
										<li className='w-100 text-lg'>Github</li>
										<li className='w-100'>Github</li>
										<li className='w-100'>Github</li>
									</ul>
								</div>
							</section>
						</div>
						<div className='footer-bottom my-5'>
							<p className='test-xs-center'>
								&copy;{this.state.currentTime} Copyright: Easy-RPG.com
							</p>
						</div>
					</div>
				</section>
			</Container>
		)
	}
}

export default ConstantFooter

{
	/* <h2>&copy;{this.state.currentTime} Copyright: Easy-RPG.com</h2> */
}
