import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from './userAuthentication';

const AccountCreate = () =>{
    const [user,setUser] = useContext(UserContext)

    return(
        <div>
            <h3> {user.user_id} </h3>
            <button
                onClick={() => {
                    const newUser = { user_id: 'Joe', user_type: true }
                    setUser(newUser)
                }}
            >
                Update User
            </button>
        </div>
    );
};

export default AccountCreate;
