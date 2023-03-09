import React from 'react'

import Button from 'react-bootstrap/Button'

import StartAParty from '../partyStuff/StartAParty'
import PartyHud from '../partyStuff/PartyHud'

class PlayerActionMenu extends React.Component {
	constructor(props) {
		super(props)

		this.sate = {}
	}

	render() {
		return (
			<>
				<div id='player_action_menu' className='p-0 m-0'>
					<div id='action_buttons'>
						<Button size='md' onClick={this.props.handleShowInventory}>
							Inventory
						</Button>

						<section id='party_screen' className='my-2 mx-2 w-25'>
							{!this.props.inAParty ? (
								<StartAParty
									createOrStartAParty={this.props.createOrStartAParty}
								/>
							) : (
								<PartyHud
									partyName={this.props.partyName}
									leaveParty={this.props.leaveParty}
									messages={this.props.messages}
									sendChatMessage={this.props.sendChatMessage}
								/>
							)}
						</section>
					</div>
				</div>
			</>
		)
	}
}

export default PlayerActionMenu
