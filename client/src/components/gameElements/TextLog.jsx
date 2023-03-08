import React from 'react'
import Container from 'react-bootstrap/esm/Container'

class TextLog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			log: ['sample text', 'sample text 2', 'blah', 'blah', 'blah'],
		}
	}

	addToLog = () => {
		let newLog = [...this.state.log]
		newLog.push(this.props.textAddedToLog)

		this.setState({
			log: newLog,
		})
	}

	componentDidMount() {
		this.addToLog()
	}

	render() {
		return (
			<Container id='text_log'>
				{this.state.log.map((element, i) => (
					<p key={i}>{element}</p>
				))}
			</Container>
		)
	}
}

export default TextLog
