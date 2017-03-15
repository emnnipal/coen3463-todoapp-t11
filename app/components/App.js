import React from 'react'
import './App.css';
import { Container, Grid,Segment } from 'semantic-ui-react';

class App extends React.Component{
    constructor(props) {
    super(props);
    
    }
    render(){
        return(
            <Container fluid>
                  {this.props.children}       
            </Container>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App;
