import React from 'react'
import Container from 'react-bootstrap/Container'
import PlayerActionMenu from './PlayerActionMenu'
import PlayerInfoMenu from './PlayerInfoMenu'

class PlayerContextMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<Container id='player_context_menu'>
				<PlayerInfoMenu playerInfo={this.props.playerInfo}></PlayerInfoMenu>
				<PlayerActionMenu
					handleShowInventory={this.props.handleShowInventory}
					handleDealDamage={this.props.handleDealDamage}
				></PlayerActionMenu>
			</Container>
		)
	}
}

export default PlayerContextMenu
