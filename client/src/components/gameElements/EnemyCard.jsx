import React from "react";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class EnemyCard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      maxHP: 20,
      currentHP: 15,
      name: 'Goblin',
      class: ['Fighter', 'Necromancer', 'Assassin'],
      itemsDropped: ['health potion', 'mana potion', '3gold']
    }
  }

  takeDamage = (damage) => {
    this.setState({
      currentHP: this.state.currentHP - damage
    })
  }


  render(){
    return(
      <>
      <Card className="enemy" key='enemy_0' id='enemy_0'>
        <Card.Header>
          {this.state.name}
        </Card.Header>
        <Card.Body>
          <p>Class: {this.state.class[Math.round(Math.random() * 2)]}</p>
          <ProgressBar 
            min={0} 
            max={this.state.maxHP} 
            now={this.state.currentHP} 
            variant='danger'
            onClick={() => this.takeDamage(5)}
            />
        </Card.Body>
      </Card>
      </>

    )
  }
}

export default EnemyCard;