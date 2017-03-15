import React, {Component, PropTypes} from 'react';
import './App.css';
import AuthApi from '../api/AuthApi';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react';

class Login extends Component {
    constructor(props,context) {
      super(props,context);
        this.state={
          username: "",
          user:"",
          error: "",
          title: "",
        }
        this.onLogin = this.onLogin.bind(this)
        
    }

    onLogin(e){
        e.preventDefault();
        let data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        AuthApi.onLogin(data).then((res)=>{
            console.log(res);
            const data = res.data;
            if(data.success){
              this.setState({
                user: res.data.response._id,
                username: data.response.username,
              });
              this.context.router.push('/todo/all');
              // window.location = '/todo';
              console.log(data);
              return;
            }else{
              this.setState({
                error: data.response,
                title: data.title,
              });
              console.log(data);
              console.log("Login Failed!");}
        }).catch((err)=>{
          console.log(err);
        });
       
    }
    
    render(){
    return (
      <Form>
      {this.state.error?
      <Message negative>
        <Message.Header>{this.state.title}</Message.Header>
        <p>{this.state.error}</p>
      </Message>:<p/>}
      
        <Form.Field>
          <label>Username</label>
          <Input>
          <input type="text" placeholder="" size="tiny" ref="username"/></Input>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input>
          <input type="password" placeholder="" ref="password"/></Input>
        </Form.Field>
        <Button onClick={this.onLogin} value="Login">Login</Button>
    </Form>
    )
  }
}
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Login;
