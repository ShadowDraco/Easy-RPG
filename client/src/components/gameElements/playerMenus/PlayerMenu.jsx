import React from 'react'
import Container from 'react-bootstrap/Container'
import TextLog from '../TextLog'
import PlayerContextMenu from './PlayerContextMenu'
import StartAParty from '../partyStuff/StartAParty'
import PartyHud from '../partyStuff/PartyHud'

class PlayerMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<Container fluid id='player_menu' className='w-100 h-50'>
				<PlayerContextMenu
					playerInfo={this.props.playerInfo}
					handleShowInventory={this.props.handleShowInventory}
					handleDealDamage={this.props.handleDealDamage}
					partyName={this.props.partyName}
					inAParty={this.props.inAParty}
					leaveParty={this.props.leaveParty}
					createOrStartAParty={this.props.createOrStartAParty}
				/>
				<TextLog
					inAParty={this.props.inAParty}
					textAddedToLog={this.props.textAddedToLog}
					sendChatMessage={this.props.sendChatMessage}
				/>
			</Container>
		)
	}
}

export default PlayerMenu
