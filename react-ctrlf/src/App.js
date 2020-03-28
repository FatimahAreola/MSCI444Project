import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from './sayHello';
import AccountCreate from './AccountCreate';

function App(props) {
    return(
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path="/createAccount" exact component={AccountCreate} />
                    </Switch>
                </div>
            </Router>
        );
}

export default App;
