import React, {useState, useEffect, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from './userAuthentication';
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'

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
        <Header as='h1' id="loginHeader">Welcome!</Header>
        <Form id="login">
        <Form.Field>
        <label>Email</label>
        <input type="text" placeholder='E-mail'
               onChange={e => {
                   setEmail(e.target.value);
               } }
        />
        </Form.Field>
        <Form.Field>
        <label>Password</label>
        <input type="text" placeholder='password'
        onChange={e => {
            setPassword(e.target.value);
        } }
        />

        </Form.Field>

        <Form.Field>
        <Checkbox label='Student' id="student" onChange={
            e => setTable("Student")
        }/>
        </Form.Field>

        <Form.Field>
        <Checkbox label='Professor' id="professor" onChange={
            e => setTable("Professor")
        }/>
        </Form.Field>
        <button type="submit" class="ui button"
            onClick={() => {
                const evaluate = async() =>{
                    const results = await fetchDbResults();
                    if (results.ok){
                        results.json().then(data => {
                            const user_id = data.user_id
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
        <Link className="links" to="/accountCreate"> No account? </Link>
        </Form>
        </div>
    );
    };

export default Login;


