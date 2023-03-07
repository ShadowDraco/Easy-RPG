import React from "react";
import Container from "react-bootstrap/Container";
import PlayerActionMenu from "./PlayerActionMenu";
import PlayerInfoMenu from "./PlayerInfoMenu";

class PlayerContextMenu extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Container id="player_context_menu">
        <PlayerInfoMenu></PlayerInfoMenu>
        <PlayerActionMenu handleShowInventory={this.props.handleShowInventory} handleAttackEnemy={this.props.handleAttackEnemy} ></PlayerActionMenu>
      </Container>
    )
  }
}

export default PlayerContextMenu;