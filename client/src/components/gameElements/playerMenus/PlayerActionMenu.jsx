import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

class PlayerActionMenu extends React.Component {
	constructor(props) {
		super(props)

		this.sate = {}
	}

	render() {
		return (
			<>
				<Container id='player_action_menu'>
					<ProgressBar variant='success' now={50} />
					<ProgressBar variant='primary' now={50} />
					<ProgressBar variant='warning' now={50} />
					<div id='action_buttons'>
						<Button size='lg' onClick={this.props.handleDealDamage}>
							Attack
						</Button>
						<Button size='lg' onClick={this.props.handleShowInventory}>
							Inventory
						</Button>
						<Button size='lg'>Run</Button>
					</div>
				</Container>
			</>
		)
	}
}

export default PlayerActionMenu
