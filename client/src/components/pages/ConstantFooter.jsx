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
			<Container className='footer'>
				<section className='main-footer'>
				<div className='container'>
					<div className='row'>
					<section className='ul'>
					<div className='col-md-3 col-sm-6'>
					<h5>Dungeons crafted by:</h5>
					<ul className='list-unstyled'>
					<li>Ethan Storm</li>
					<li>Kawika Miller</li>
					<li>Darran Holmes</li>
					</ul>
					
				</div>
				<div id='column2' className='col-md-3 col-sm-6'>
					<h5>You can find us on:</h5>
					<ul className='list-unstyled'>
					<li>Github link</li>
					<li>Github link</li>
					<li>Github link</li>
					</ul>
					
				</div>
				</section>
				</div>
				<div className='footer-bottom'>
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

