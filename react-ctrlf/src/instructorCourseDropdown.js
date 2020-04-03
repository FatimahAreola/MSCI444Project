import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import { CourseContext } from './courseContext';
import { UserContext } from './userAuthentication';
import { Dropdown } from 'semantic-ui-react'

export const InstructorCourseDD = ({ courses }) =>{
    const [user,setUser] = useContext(UserContext);
    const [courseInfo, setCourseInfo] = useContext(CourseContext);
    return(

        <Dropdown text='Courses' id="lectureDropdown">
            <Dropdown.Menu>

                {
                    courses.map(course=>{
                        return(
                            <Dropdown.Item text={course.course_id} onClick={
                            (e)=>{
                                setCourseInfo({"course_name": course.course_name,
                                                   "course_access_code": course.course_access_code});
                            }}/>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );


}
