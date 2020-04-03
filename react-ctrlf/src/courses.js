import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import { CourseContext } from './courseContext';
import { UserContext } from './userAuthentication';

export const Courses = ({ courses }) =>{
    const [user,setUser] = useContext(UserContext);
    const [courseInfo, setCourseInfo] = useContext(CourseContext);
    const [changeLocation, setChangeLocation] = useState(false);
    let history = useHistory();

    const updateCurrentCourse  =(e)=>{
        const access_code = e.target.getAttribute("data-course-access-code")
        const course_name = e.target.getAttribute("data-course-name")
        setCourseInfo({course_name:course_name, course_access_code: access_code});
        history.push("/lectureMatch")
    }

    return(
        <ul>
            {courses.map(course =>{
                return(
                    <div>
                        <button data-course-name={course.course_name} data-course-access-code={course.course_access_code} className="ui button" onClick={updateCurrentCourse}
                        >
                    {course.course_id}
                    </button>
                    <br></br>
                    <br></br>
                    </div>
                )
            })}
        </ul>
    )
};
