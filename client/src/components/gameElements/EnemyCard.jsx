import React from "react";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class EnemyCard extends React.Component{
  constructor(props){
    super(props);
    this.enemy0 = React.createRef();
    this.state = {
      maxHP: 20,
      currentHP: 15,
      name: 'Goblin',
      class: ['Fighter', 'Necromancer', 'Assassin'],
      itemsDropped: ['health potion', 'mana potion', '3gold'],
      variant: ''
    }
  }

  takeDamage = () => {
    if (this.state.currentHP - this.props.handleAttackEnemy() < 0) {
      this.setState({
        variant: 'danger',
        currentHP: 0
      })
    } else {
      this.setState({
      currentHP: this.state.currentHP - this.props.handleAttackEnemy()
      })
    }

  }


  render(){
    return(
      <>
      <Card className="enemy" key='enemy_0' id='enemy_0' onClick={() => this.takeDamage()} style={{cursor: 'pointer'}} bg={this.state.variant.toLowerCase()}>
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
            />
        </Card.Body>
      </Card>
      </>

    )
  }
}

export default EnemyCard;