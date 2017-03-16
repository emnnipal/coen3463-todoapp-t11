import React, {Component} from 'react';
import AuthApi from '../api/AuthApi';
import './App.css';
import { Button, Checkbox, Form, Input, Label, Message } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
  super(props);
    this.state={
      username: "",
      error: "",
      title: "",
      emailerror:false,
      nameError:false,
      isLoading: false,
    }
    this.onRegister = this.onRegister.bind(this);
    this.onEmail = this.onEmail.bind(this);
    this.onUsername = this.onUsername.bind(this);
  }

  onEmail(e){
    var regex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(this.refs.email.value,) ===false){
        this.setState({
          emailerror: true
        })
    }else{
        this.setState({
          emailerror: false
        })
        
    }
  }
  onUsername(e){
    var regex= /^([a-zA-z]{7,})$/;
    if(regex.test(this.refs.username.value,) ===false){
        this.setState({
          nameError: true
        })
    }else{
        this.setState({
          nameError: false
        })
        
    }
  }

  onRegister(e){
        e.preventDefault();
        if(this.refs.password.value>6){
            alert("Your password must be at least 6 characters long. Please try another.");
            return;
        }
        let data={
            username: this.refs.username.value,
            password: this.refs.password.value,
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            email: this.refs.email.value,
        }
        AuthApi.onRegister(data).then((res)=>{
            console.log(res.data); //access data here //check the console
            const data = res.data;
            if(data.success){
              this.setState({  
                user: data.response._id,
                username: data.response.username,
              });
              this.context.router.push('/todo');
              console.log(data);
              return;
            }else{
              this.setState({
                error: data.response.message,
                title: data.title,
              });
              console.log(data);
              console.log("Register Failed!");
            }
        }).catch((err)=>{
          console.log(err);
        });
  }

  render() {
    return (
      <Form>
        {this.state.error?
        <Message negative>
          <Message.Header>{this.state.title}</Message.Header>
          <p>{this.state.error}</p>
        </Message>:<p/>}
        <Form.Field>
          <label>Fields with <bold style={{color:'red'}}>*</bold> are required.</label>
          <br/>
          <label>Username <bold style={{color:'red'}}>*</bold></label>
          <Input>
          <input type="text" placeholder="" ref="username" onKeyPress={this.onUsername} required={true}/>
          </Input>
          {this.state.nameError?<Label basic color='red' pointing>Your username must be atleast 8 alphacharacters.</Label>:
          <p></p>}
        </Form.Field>
        <Form.Field>
          <label>Password <bold style={{color:'red'}}>*</bold></label>
          <Input>
          <input type="password" placeholder="" ref="password" required={true}/>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>First Name <bold style={{color:'red'}}>*</bold></label>
          <Input>
          <input type="text" placeholder="" ref="first_name" required={true}/>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <Input>
          <input type="text" placeholder="" ref="last_name" required={true}/>
          </Input>
        </Form.Field>
        <Form.Field>
          <label>Email <bold style={{color:'red'}}>*</bold></label>
          <Input>
          <input type="text" placeholder="" ref="email" onKeyPress={this.onEmail} required={true}/>
          </Input>
          {this.state.emailerror?<Label basic color='red' pointing>Invalid Format of Email</Label>:
          <p></p>}
          
        </Form.Field>
        <Button onClick={this.onRegister} value="Register">Register</Button>
      </Form>
    )
  }
}

Register.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Register;
