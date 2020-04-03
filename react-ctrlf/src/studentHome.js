import React, { useContext, useState, useEffect} from 'react';
import { UserContext } from './userAuthentication';
import { Courses } from './courses'
import LectureMatch from './lectureMatch'

const StudentHome =()=>{
    const [user,setUser] = useContext(UserContext);
    const [courses, setCourses] = useState([]);
    const [willJoinCourse, setJoinCourse] = useState(false);
    const [accessCode, setAccessCode] = useState('');


    const display_courses = () => {
        if(courses.length==0){
            return (<div></div>)
        }
        else{
            courses.map(course=>{
            })
            return(<Courses courses={courses} nextPage="/lectureMatch" />)
        }
    }


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
                setCourses(data.courses);
            })
              );
    });

    const joinACourse = async()=>{
        const info={"user_id": user.user_id, "access_code": accessCode};
        const response = await fetch('/course/join',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        return(response);
    }
    const add = async()=>{
        const results = await joinACourse();
        if(results.ok){
            results.json().then(data =>{
                setCourses(prevCourses => [...prevCourses, data.course])
            })
            alert('Course Added')
        }
        else{
            alert('Course could not be added')
        }
    }

    const joinCourseInput =(f)=>{
        if(f){
            return    (
                <div class = "ui input">
                <input type ="text" placeholder="Access Code" onChange={e => setAccessCode(e.target.value)}/>
                <button type="submit" className="ui button" onClick={add}>
                    Add
                </button>
                </div>
            )
        }
        else{
            return (<p></p>);
        }
    }

    return(
        <div>
            <button type="submit" className="ui button" onClick={()=>{
                setJoinCourse(true);
            }}>
                Join Course
            </button>
            {joinCourseInput(willJoinCourse)}
            {
                display_courses()

            }
        </div>
    );


}

export default StudentHome

