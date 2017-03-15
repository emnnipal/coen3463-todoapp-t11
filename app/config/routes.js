import React from 'react';
import ReactRouter, { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './../components/App';
import TodoContainer from '../container/TodoContainer';
import UserContainer from '../container/UserContainer';

var routes = (
    <Router history={browserHistory} >
        <Route path='/' component={App}>
            <IndexRoute component={UserContainer} />
            <Route path =':mode' component={UserContainer}/>
            <Route path ='todo/:mode' component={TodoContainer}/>
        </Route>
    </Router>
)

export default routes;



