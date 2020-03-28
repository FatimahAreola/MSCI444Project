import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Link} from 'react-router-dom';
function Login(props){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [table, setTable] = useState(false)
    const [success, setSuccess] = useState(false)
    const fetchDbResults  = async() =>{
        const credentials={email, password, table};
        const response = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        alert('evaluating response');
        if(response.ok){
            alert('Response evaluated to okay')
        }
        else{
            alert('Response did not evaluate to okay')
        }
        return(response);
    }


    return(
        <div>
        <h1 className="ui header" id="welcome">Welcome!</h1>
        <h2 className="ui header">Please enter your login information</h2>
        <div className="accountWindow">
            <form className="ui form">
                <div className="field">
                    <label>E-mail</label>
                    <input placeholder="E-mail" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="checkbox" tabindex="0" className="hidden" onChange={e => setTable('Instructor')}/>
                    <label> Instructor</label>
                </div>
                <div>
                     <input type="checkbox" tabindex="0" className="hidden" onChange={e => setTable('Student')}/>
                        <label> Student</label>
                </div>
                <br></br>
                <button type="submit" className="ui button" onClick={
                ()=>{
                    const evaluate = async() =>{
                        const results = await fetchDbResults();
                        if (results.ok){
                            alert("Yep results okay");
                        }

                    }
                    alert('Call evaluate');
                    evaluate();
                }

                }>Submit</button>
        <Link to="/createAccount">No account or what?</Link>
            </form>
        </div>
        </div>
        );
    }

export default Login;
