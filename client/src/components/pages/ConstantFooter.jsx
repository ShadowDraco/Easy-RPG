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
			<Container className='page-footer font-small blue'>
				<section className='main-footer'>
				<div className='container'>
					<div className='row'>
				<h3>&copy;{this.state.currentTime} Copyright: Easy-RPG.com</h3>
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
