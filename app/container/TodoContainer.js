import React from 'react';
import Todo from '../components/Todo';
import AuthApi from '../api/AuthApi';   
import TodoApi from '../api/TodoApi';
import Loading from '../components/loading'
import ToDos from '../components/ToDos'

class TodoContainer extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
        	user:'',
            email: '',
            username: '',
            isLoading: true,
            items:[],
            isUpdating: true,
            isEditing: true,
            isCounting: true,
            completedCount: 0,
            originalitems: 0,
            activeItem: 'all',
        }
        this.onLogout = this.onLogout.bind(this);
        this.handleSetStateItem =  this.handleSetStateItem.bind(this);
        this.handleOnComplete = this.handleOnComplete.bind(this);
        this.todoOpen = this.todoOpen.bind(this);
        this.todoAll = this.todoAll.bind(this);
        this.todoCompleted = this.todoCompleted.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
        this.handleitems = this.handleitems.bind(this);
        this.DelAllComplete = this.DelAllComplete.bind(this);
        this.handleSplice = this.handleSplice.bind(this);
    }

    componentDidMount(){
        let lastUserState = this.state.user;
        let lastItemState = this.state.items;
        if(lastUserState!==''){
            return;	
        }else{
            AuthApi.onGetUser().then((res)=>{
                if(res.data.response){
                    this.setState({
                        user: res.data.response._id,
                        email: res.data.response.email,
                        username: res.data.response.username,
                        isLoading: false,
                    });
                    TodoApi.onGetTodo(res.data.response._id)
                    .then((mytodo)=>{
                        this.setState({
                            items:[...lastItemState,...mytodo],
                            
                            originalitems: mytodo.length,
                        })
                    });
                    TodoApi.onGetCompleted(res.data.response._id)
                    .then((mytodo)=>{
                        this.setState({
                            completedCount: mytodo.length,
                            isCounting: false,
                            isUpdating: false,
                        })
                    });
                }else{
                    this.context.router.push('/');
                
                }
            });
        }       
    }  
    onLogout(e){
        e.preventDefault();
        AuthApi.onLogout().then((res)=>{
            console.log(res);
            console.log("Logout Success!")
            this.context.router.push('/');  
            // window.location = '/';
        }).catch((err)=>{
          console.log(err);
        });  
    }

    handleSetStateItem(value){
        this.setState({items:value});
    }

    handleSplice(){
        this.state.items.splice(this.state.completedCount,1)
    }

    handleitems(){
        this.setState({originalitems:this.state.originalitems + 1})
    }

    handleOnComplete(todo,index){
        this.setState({isEditing: true});
        let lastItems = this.state.items;
        lastItems[index].completed = !lastItems[index].completed;
        TodoApi.onEdit(todo._id,"isCompleted",!todo.isCompleted)
            .then(res=>{
                if(res.data.success){
                    if(this.props.routeParams.mode==='completed' || this.props.routeParams.mode==='open'){
                        lastItems.splice(index,1);
                    } else {
                        lastItems.splice(index,1,res.data.response);
                    }
                    this.setState({
                        items: [...lastItems],
                        completedCount: todo.isCompleted ? this.state.completedCount - 1 : this.state.completedCount + 1,
                        isEditing: false
                    });
                    return;
                }
                this.setState({isEditing:false});
            }).catch(err=>{
                console.log(err)
            });;
    }
    OnDelete(todo,index){
        console.log(todo);
        this.setState({isUpdating: true});
        let lastItemState = this.state.items;
        TodoApi.onDelete(todo._id).then(res=>{
            if(res.data.success){
                lastItemState.splice(index,1);
                if(todo.isCompleted===true){
                this.setState({
                    items: [...lastItemState],
                    isUpdating: false,
                });
                }else{
                this.setState({
                    items: [...lastItemState],
                    isUpdating: false,
                    originalitems: this.state.originalitems - 1
                });
                }
                return;
            }
            this.setState({isUpdating: false});
            alert(res.data.response);
        });
    }
    DelAllComplete(){
        this.setState({isUpdating:true});
        TodoApi.onDelAllComplete(this.state.user)
        .then(res=>{
            if(res.data.success){
                console.log("success deleting all completed todo")
            }
            TodoApi.onGetTodo(this.state.user)
            .then(mytodo=>{
            console.log(mytodo)
            this.setState({isUpdating:false,
                        items: [...mytodo],
                        originalitems: this.state.originalitems - this.state.completedCount,
                        completedCount: 0,});
            });
        })
        .catch(err=>{
             console.log("try again")
        });
        
    }

    todoOpen(){
        this.setState({isUpdating:true,
                        activeItem:'open'});
        this.context.router.push('/todo/open');
        TodoApi.onGetOpen(this.state.user)
        .then(mytodo=>{
            this.setState({isUpdating:false,
                        items: [...mytodo]}
                        );
        }).catch(err=>{
            console.log(err)
        });
    }

    todoAll(){
        this.setState({isUpdating:true,
                        activeItem:'all'});
        this.context.router.push('/todo/all');
        TodoApi.onGetTodo(this.state.user)
        .then(mytodo=>{
            this.setState({isUpdating:false,
                        items: [...mytodo]});
        }).catch(err=>{
            console.log(err)
        });
    }

    todoCompleted(){
        this.setState({isUpdating:true,
                        activeItem:'completed'});
        this.context.router.push('/todo/completed');
        TodoApi.onGetCompleted(this.state.user)
        .then(mytodo=>{
            this.setState({isUpdating:false,
                        items: [...mytodo]});
        }).catch(err=>{
            console.log(err)
        });
    }

    render(){
        return(
            <div>
            <Todo onLogOut={this.onLogout} 
                name={this.state.username} 
                email={this.state.email} 
                isLoading={this.state.isLoading}
                user={this.state.user}
                items={this.state.items}
                setStateItem={this.handleSetStateItem}
                todoItems={this.state.items}
                onComplete={this.handleOnComplete}
                onUpdate={this.state.isUpdating}
                todoAll={this.todoAll}
                todoOpen={this.todoOpen}
                todoCompleted={this.todoCompleted}
                OnDelete={this.OnDelete}
                completedCount={this.state.completedCount}
                originalitems={this.state.originalitems}
                onCounting={this.state.isCounting}
                setOriginalItems={this.handleitems}
                DelAllComplete={this.DelAllComplete}
                activeItem={this.state.activeItem}
                mode={this.props.routeParams.mode}
                handleSplice={this.handleSplice}
            />
            </div>
        )
    }
}

TodoContainer.contextTypes = {
    router: React.PropTypes.object.isRequired

};

export default TodoContainer;