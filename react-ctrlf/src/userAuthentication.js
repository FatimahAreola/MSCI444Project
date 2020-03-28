import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider  = props =>{
    const [user,setUser] = useState(
        {
            user_id: " carla",
            user_type: " "
        }

    );
    return (
        <UserContext.Provider value={[user,setUser]}>
        {props.children}
        </UserContext.Provider>
    );

};


