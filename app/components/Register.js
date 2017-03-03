import React, {Component} from 'react';

class Register extends Component {
  constructor(props) {
  super(props);
    this.state={
      count: 0,
      username: "",
      error: "",
    }
    this.register = this.register.bind(this)
  }

  
  register(){
        const registerAPI = '/auth/register';
        var body = {username: this.refs.username.value,
                    password: this.refs.password.value,
                    first_name: this.refs.first_name.value,
                    last_name: this.refs.last_name.value,
                    email: this.refs.email.value,
                    }
        // call api, make sure to include api key in headers
        fetch(registerAPI, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then((response) => {
          try{
            response.json().then((data) => {
            // set state based on decoded data
            // console.log(data.error)
            this.setState({
              username:data.message.username
            }).bind(this);
          })}
          catch(e){
            console.log('error',e)
            response.json().then((data) => {
            // set state based on decoded data
            
            this.setState({
              username:data.error
            }).bind(this);
          })
          }

          
          // console.log(response)
          // decode response to json
        
        })
  }


  render() {
    return (
      <div className="counter">
          <p>{this.state.username}</p>
          <label>username</label>
          <input type="text" placeholder="" ref="username">
          </input>
          <br/>
          <label>password</label>
          <input type="password" placeholder="" ref="password"> 
          </input>
          <br/>
          <label>First name</label>
          <input type="text" placeholder="" ref="first_name"> 
          </input>
          <br/>
          <label>Last name</label>
          <input type="text" placeholder="" ref="last_name"> 
          </input>
          <br/>
          <label>Email</label>
          <input type="text" placeholder="" ref="email"> 
          </input>
          <br/>
          <button onClick={this.register} value="Register">Register</button>
        

      </div>
    )
  }
}
export default Register;
