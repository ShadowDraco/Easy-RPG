import React from 'react';
import Container from 'react-bootstrap/esm/Container';

class TextLog extends React.Component {
constructor(props){
  super(props);

  this.state = {

  }
}

render() {
  return(
  <Container id='text_log'>
    <p>This is the oldest text</p>
    <p>This is where your text log would go</p>
    <p>This is what happened most recently</p>
  </Container>
  )

}
}

export default TextLog;