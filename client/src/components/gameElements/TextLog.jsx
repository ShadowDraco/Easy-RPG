import React from 'react'
import Container from 'react-bootstrap/esm/Container'

class TextLog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			log: [],
		}
	}

	addToLog = () => {
		let newLog = [this.props.textAddedToLog, ...this.state.log]

		this.setState({
			log: newLog,
		})
	}

	componentDidUpdate(prevProps) {
		if(prevProps.textAddedToLog !== this.props.textAddedToLog) {
			this.addToLog();
		}
	}


	render() {
		return (
			<Container id='text_log' style={{textAlign: 'left'}}>
				{this.state.log.map((element, i) => (
					<p key={i} style={{margin: '0.25rem 0'}}>{element}</p>
				))}
			</Container>
		)
	}
}

export default TextLog
