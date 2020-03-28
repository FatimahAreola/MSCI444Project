import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from './userAuthentication';

const Login = () =>{
    const [user,setUser] = useContext(UserContext)
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('leal')
    const [table, setTable] = useState('Student')
    let history = useHistory();
    const fetchDbResults  = async() =>{
        alert(email)
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
        <h3> {user.user_id} </h3>
        <input
        type="text"
        placeholder="Enter some letters"
        onChange={e => {
            setEmail(e.target.value);
        } }
        />
        <button
            onClick={() => {
                const evaluate = async() =>{
                    const results = await fetchDbResults();
                    if (results.ok){
                        alert('Results came back okay')
                        const newUser = { user_id: email, user_type: table }
                        setUser(newUser)
                        history.push('/accountCreate')
                    }

                }
                alert('Call evaluate');
                evaluate();
            }}
        >
            Update User
        </button>
        <Link to="/accountCreate"> No account? </Link>
        </div>
    );
    };

export default Login;
