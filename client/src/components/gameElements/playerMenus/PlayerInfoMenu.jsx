import React from "react";
import Container from "react-bootstrap/Container";

class PlayerInfoMenu extends React.Component{
  constructor(props){
    super(props);

    this.state - {

    }
  }

  render(){
    return(
      <Container id='player_info_menu'>
        <h5>this.props/state.playerName</h5>
        <div className='player_stat_display'>
          <div className="player_stat_block">
            <p>HP: xx</p>
            <p>ATK: xx</p>
            <p>DEF: xx</p>
          </div>
          <div className="player_stat_block">
            <p>SPD: xx</p>
            <p>MAG: xx</p>
            <p>RES: xx</p>
          </div>
        </div>
      </Container>
    )
  }
}

export default PlayerInfoMenu;