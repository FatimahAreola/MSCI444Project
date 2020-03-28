import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from './userAuthentication';
const StudentHome =()=>{
    const [user,setUser] = useContext(UserContext);
    const [courses, setCourses] = useState('');
    useEffect(() =>{
        fetch('/courses',
              {
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({'user_id': user.user_id})
              }).then(response =>
            response.json().then(data =>{
                alert(data.courses);
                setCourses(data.courses);
            })
              );
    }, []);

    return(

        <div>
            {
                    <h2> {user.user_id} </h2>
            }
        </div>
    );


}

export default StudentHome
