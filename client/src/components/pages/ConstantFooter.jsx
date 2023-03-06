import React from 'react'
import Container from 'react-bootstrap/Container'

class ConstantFooter extends React.Component {
	constructor(props) {
		super(props)
		console.log()
	}

	render() {
		return (
			<Container className='my-5'>
				<h1>Footer</h1>
			</Container>
		)
	}
}

export default ConstantFooter
