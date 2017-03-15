import React, {PropTypes} from 'react';
import '../components/App.css';
import ToDos from '../components/ToDos.js';
import Loading from './loading';
import TodoApi from '../api/TodoApi';
import { Container } from 'semantic-ui-react'
import { Segment, Menu, Input, Form, List } from 'semantic-ui-react'
var moment = require('moment-timezone');

class Todo extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isAdding: false
        }
        this.onAddTodo = this.onAddTodo.bind(this);
    }
    onAddTodo(e) {
        this.setState({isAdding:true});
        e.preventDefault();
        var lastState = this.props.items; 
        let toDo = { 
            name: this.refs.todo.value,
            user: this.props.user,
            createDate: moment().tz("Asia/Manila").format('LLL'),
        }
        this.setState({ 
            items :[...lastState,Object.assign({},toDo)]
        });
        TodoApi.onAddTodo(toDo).then(res=>{
            console.log(res.data.response);
            if(res.data.success){
                console.log(this.props.mode)
                this.props.setStateItem([...lastState,Object.assign({},res.data.response)]);
                this.props.setOriginalItems();
                if(this.props.mode==='completed'){
                        this.props.handleSplice();                        
                }
                this.setState({isAdding:false});
                return;
            }
        }).catch(err=>{
            console.log(err);
        }); 
    }
    
    render(){
    return(
        <div className="App-section">
                <div className="App-header">
                    <p style={{textAlign:'center'}}>To Do App!</p>
                    
                </div>
                {this.props.isLoading? 
                <Loading text="Please Wait" speed={300}/>
                :
                <Container>
                <p>{this.props.name} | {this.props.email}</p>
                <div className="App-section">
                <Menu pointing secondary>
                  <Menu.Item name='all' active={this.props.mode === 'all'} onClick={this.props.todoAll} />
                  <Menu.Item style={{color: 'blue'}} name='open' active={this.props.mode === 'open'} onClick={this.props.todoOpen} />
                  <Menu.Item style={{color: 'red'}}  name='completed' active={this.props.mode === 'completed'} onClick={this.props.todoCompleted} />
                  <Menu.Menu position='right'>
                    <Menu.Item name='Clear All Completed' onClick={this.props.DelAllComplete} />
                    <Menu.Item name='logout' onClick={this.props.onLogOut} />
                  </Menu.Menu>
                </Menu>
                <Form>
                <Form.Field>
                    <Input size="medium">
                        <input placeholder="Add a To Do item." ref="todo"/>
                        <button onClick={this.onAddTodo}>+</button>
                    </Input>
                </Form.Field>
                </Form>
                <Segment>
                    <div className="App-section">
                    {this.props.onUpdate? <Loading text="Just one second" speed={300}/>:
                    <div>{(this.props.originalitems - this.props.completedCount)=== 1?
                    <p>{this.props.originalitems - this.props.completedCount}/{this.props.originalitems} item left</p>:
                    <p>{this.props.originalitems - this.props.completedCount}/{this.props.originalitems} items left</p>
                    } 
                        {this.props.onUpdate? <Loading text="Loading" speed={300}/>:
                        <div>
                        <List verticalAlign='middle'>
                        {this.props.items.map((item, index)=>
                            <ToDos key={index}
                                    item={item}
                                    index={index}
                                    onComplete={this.props.onComplete}
                                    OnDelete={this.props.OnDelete}/>
                        )}
                        </List>
                        </div>
                        }
                        </div>
                    }
                    </div>
                </Segment>
                </div>
                </Container>
                }
        </div>
    )
}
}

Todo.PropTypes = {
    onLogOut: PropTypes.func.isRequired,
    onAddTodo: PropTypes.func.isRequired,
    
}
export default Todo;
