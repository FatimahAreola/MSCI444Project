import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { UserProvider } from './userAuthentication'
import { CourseProvider } from './courseContext'
import { LectureProvider } from './lectureContext'
import { TextbookProvider } from './textbookContext'
import Login from './sayHello';
import AccountCreate from './AccountCreate';
import StudentHome from './studentHome';
import LectureMatch from './lectureMatch'
import { Container, Header } from 'semantic-ui-react';
import InstructorHome from './instructorHome'

function App(props) {
    return(
        <Router>
        <div>
            <Switch>
                <TextbookProvider>
                <LectureProvider>
                <CourseProvider>
                    <UserProvider>
                <Route path="/" exact component={Login}/>
                <Route path="/accountCreate" exact component={AccountCreate}/>
                <Route path="/studentHome" exact component={StudentHome}/>
                <Route path="/lectureMatch" exact component={LectureMatch}/>
                <Route path="/instructorHome" exact component={InstructorHome}/>
                    </UserProvider>
                </CourseProvider>
                </LectureProvider>
                </TextbookProvider>
            </Switch>
        </div>
        </Router>
        );
}

export default App;
