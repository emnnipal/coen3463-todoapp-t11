import React, {Component,PropTypes} from 'react';
import '../components/App.css';
import Login from '../components/Login.js';
import Register from '../components/Register.js';
import { Segment, Button, Divider, Menu, Input, Grid, Container} from 'semantic-ui-react'


class User extends Component {
    constructor(props,context) {
      super(props,context);
        this.state={
          activeItem: '',
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, { name }){
        this.setState({ activeItem: name })
    }


    render(){
    return(
        <Container text>
        <br/>
        <div className='userlogin'>
            <Menu attached='top' tabular>
          <Menu.Item name='login' active={this.props.mode === 'login'} onClick={this.props.handleLogin}  />
          <Menu.Item name='register' active={this.props.mode === 'register'} onClick={this.props.handleRegister} />
        </Menu>
        {this.props.mode === 'login'?
        <Segment attached='bottom'>
          <div className="App-section" >
                    <Login/>   
                </div>
        </Segment>
        :
        <Segment attached='bottom'>
                <div className="App-section" >                  
                    <Register />
                </div>
        </Segment>
        }
        </div>
        </Container>
    );
}
}

User.PropTypes = {
    login: PropTypes.bool.isRequired,
    switch: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
}


User.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default User;
