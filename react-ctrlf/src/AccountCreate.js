import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
function AccountCreate(){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [table, setTable] = useState('')
    const history = useHistory();
    const fetchDbResults  = async() =>{
        const info={email, password, firstName, lastName};
        const response = await fetch('/createAccount',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
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
        <h1 className="ui header" id="welcome">Let's set up your account!</h1>
        <div className="accountWindow">
            <form className="ui form">
                <div className="field">
                    <label>First Name</label>
                    <input placeholder="First Name" onChange={e => setFirstName(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input placeholder="Last Name" onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className="field">
                    <label>E-mail</label>
                    <input placeholder="e-mail" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="password" onChange={e => setPassword(e.target.value)}/>
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
                    {/* evaluate(); */}
                    history.push('/');
                }

                }>Submit</button>
            </form>
        </div>
        </div>
        );
}

export default AccountCreate;
