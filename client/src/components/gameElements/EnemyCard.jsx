import React from "react";
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class EnemyCard extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }


  render(){
    return(
      <>
      <Card className="enemy">
        <Card.Header>
          this.props/state.enemyName
        </Card.Header>
        <Card.Body>
          <p>Class: this.props/state.enemyClass</p>
          <ProgressBar now={100} variant='danger'/>
        </Card.Body>
      </Card>
      </>

    )
  }
}

export default EnemyCard;