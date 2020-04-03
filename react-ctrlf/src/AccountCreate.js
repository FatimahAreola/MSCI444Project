import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from './userAuthentication';
import {useHistory} from 'react-router-dom'
import { Button, Checkbox, Form, Header } from 'semantic-ui-react'

const AccountCreate = () =>{
    const [user,setUser] = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [table, setTable] = useState('Student')
    let history = useHistory();
    const insertAccountInfo  = async() =>{
        const credentials={"first_name": firstName, "last_name": lastName, "email": email, "password": password, "table": table};
        const response = await fetch('/createAccount',{
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
        <Header as='h1' id="createAccountHeader">Help us set you up!</Header>
        <Form id="createAccount">
        <Form.Field>
        <label>First Name</label>
        <input type="text" placeholder='First Name'
               onChange={e => {
                   setFirstName(e.target.value);
               } }
        />
        </Form.Field>
        <Form.Field>
        <label>Last Name</label>
        <input type="text" placeholder='Last Name'
        onChange={e => {
            setLastName(e.target.value);
        } }
        />
        </Form.Field>

        <Form.Field>
            <label>E-mail</label>
            <input type="text" placeholder='E-mail'
               onChange={e => {
                   setEmail(e.target.value);
               } }
        />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <input type="text" placeholder='Password'
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
            <Checkbox label='Instructor' id="professor" onChange={
            e => setTable("Instructor")
            }/>
        </Form.Field>
        <button type="submit" class="ui button"
                onClick={() => {
                    const evaluate = async() =>{
                        const results = await insertAccountInfo();
                        if (results.ok){
                            results.json().then(data => {
                                const user_id = data.user_id
                                const newUser = { user_email: email, user_type: table, user_id: user_id}
                                setUser(newUser)
                                history.push('/studentHome')
                            })
                        }
                        else{
                            alert('Unable to create your account. Please revise the information you have provided us')
                        }

                    }
                    evaluate();
                }}
        >
            Submit
        </button>
        </Form>
        </div>
    );
};

export default AccountCreate;


