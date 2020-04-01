import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { UserProvider } from './userAuthentication'
import { CourseProvider } from './courseContext'
import { LectureProvider } from './lectureContext'
import Login from './sayHello';
import AccountCreate from './AccountCreate';
import StudentHome from './studentHome';
import LectureMatch from './lectureMatch'
import { Container, Header } from 'semantic-ui-react';

function App(props) {
    return(
        <Router>
        <div>
            <Switch>
                <LectureProvider>
                <CourseProvider>
                    <UserProvider>
                <Route path="/" exact component={Login}/>
                <Route path="/accountCreate" exact component={AccountCreate}/>
                <Route path="/studentHome" exact component={StudentHome}/>
                <Route path="/lectureMatch" exact component={LectureMatch}/>
                    </UserProvider>
                </CourseProvider>
                </LectureProvider>
            </Switch>
        </div>
        </Router>
        );
}

export default App;
