import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider  = props =>{
    const [user,setUser] = useState(
        {
            user_email: " ",
            user_type: " ",
            user_id:" "
        }

    );
    return (
        <UserContext.Provider value={[user,setUser]}>
        {props.children}
        </UserContext.Provider>
    );

};


