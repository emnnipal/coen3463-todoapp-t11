import React from 'react';
import User from '../components/User';

class UserContainer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            login: true
        }
        this.switch = this.switch.bind(this)
    }
    switch(e){
      var laststate = this.state.login
      {laststate === true?
      this.setState({
        login: false
      }):
      this.setState({
        login: true
      });}
    }

    render(){
        return(
            <User login={this.state.login} switch={this.switch}/>
        )
    }
}

UserContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default UserContainer;