import React from 'react'
import Container from 'react-bootstrap/Container'
import PlayerActionMenu from './PlayerActionMenu'

class PlayerContextMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<Container id='player_context_menu' className=''>
				{/* <PlayerInfoMenu playerInfo={this.props.playerInfo}></PlayerInfoMenu> */}

				<PlayerActionMenu
					handleShowInventory={this.props.handleShowInventory}
					partyName={this.props.partyName}
					inAParty={this.props.inAParty}
					leaveParty={this.props.leaveParty}
					createOrStartAParty={this.props.createOrStartAParty}
					// handleDealDamage={this.props.handleDealDamage}
				></PlayerActionMenu>
			</Container>
		)
	}
}

export default PlayerContextMenu
