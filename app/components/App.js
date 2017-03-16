import React from 'react'
// import './App.css';
import { Container } from 'semantic-ui-react';
class App extends React.Component{
    constructor(props) {
    super(props);
    
    }
    render(){
        return(
            <Container fluid>
                <div className="App-header">
                    <h3 style={{textAlign:'center'}}>To Do App!</h3>
                </div>
                <br/>
                  {this.props.children}       
            </Container>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App;
