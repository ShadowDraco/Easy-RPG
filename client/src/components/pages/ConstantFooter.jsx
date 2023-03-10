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
			<Container fluid className='footer w-100 p-0'>
				<section className='main-footer p-1 w-100'>
					<div className='container p-3 w-100 pb-0' >
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
										<li className='w-100 text-lg'><a href=' https://github.com/ShadowDraco' target="_blank">GitHub</a></li>
										<li className='w-100'><a href='https://github.com/darranholmes74' target="_blank">GitHub</a></li>
										<li className='w-100'><a href='https://github.com/KMArtwork' target="_blank">GitHub</a></li>
									</ul>
								</div>
							</section>
						</div>
						<div className='footer-bottom my-5 mb-0'>
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
