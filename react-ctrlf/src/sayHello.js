import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from './userAuthentication';

const Login = () =>{
    const [user,setUser] = useContext(UserContext)
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [table, setTable] = useState('Student')
    let history = useHistory();
    const fetchDbResults  = async() =>{
        const credentials={email, password, table};
        const response = await fetch('/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return(response);
    }

    return(
        <div>
        <input
        type="text"
        placeholder="E-mail"
        onChange={e => {
            setEmail(e.target.value);
        } }
        />
        <input
        type="text"
        placeholder="Password"
        onChange={e => {
            setPassword(e.target.value);
        } }
        />
        <div>
        <input type="checkbox" id="student" onChange={
            e => setTable("Student")
        }/>
        <label for="student">Student</label>
        </div>
        <div>
        <input type="checkbox" id="professor" onChange={
            e => setTable("Professor")
        }/>
        <label for="professor">Professor</label>
        </div>
        <button
            onClick={() => {
                const evaluate = async() =>{
                    const results = await fetchDbResults();
                    if (results.ok){
                        results.json().then(data => {
                            const user_id = data.user_id
                            alert(user_id)
                            const newUser = { user_email: email, user_type: table, user_id: user_id}
                            setUser(newUser)
                            history.push('/studentHome')
                        })
                    }
                    else{
                        alert('Incorrect Login. Please try again')
                    }

                }
                evaluate();
            }}
        >
        Submit
        </button>
        <Link to="/accountCreate"> No account? </Link>
        </div>
    );
    };

export default Login;


