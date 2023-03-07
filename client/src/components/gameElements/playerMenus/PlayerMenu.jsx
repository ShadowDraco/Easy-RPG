import React from 'react';
import Container from 'react-bootstrap/Container';
import TextLog from '../TextLog';
import PlayerContextMenu from './PlayerContextMenu';

class PlayerMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Container id='player_menu'>
        <PlayerContextMenu />
        <TextLog />
      </Container>
    )
  }
}

export default PlayerMenu;