import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { UserProvider } from './userAuthentication'
import Login from './sayHello';
import AccountCreate from './AccountCreate';
import StudentHome from './studentHome';
import { Container, Header } from 'semantic-ui-react';

function App(props) {
    return(
        <Router>
        <div>
            <Switch>
            <UserProvider>
                <Route path="/" exact component={Login}/>
                <Route path="/accountCreate" exact component={AccountCreate}/>
                <Route path="/studentHome" exact component={StudentHome}/>
            </UserProvider>
            </Switch>
        </div>
        </Router>
        );
}

export default App;
