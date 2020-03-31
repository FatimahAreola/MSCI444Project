import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './userAuthentication';
import { CourseContext } from './courseContext';
import { Dropdown, Message } from 'semantic-ui-react'
import { LectureDropdown } from './Dropdown'
import LectureSlides from './lectureSlides'
import { LectureContext } from './lectureContext';


const LectureMatch = () =>{
    const [user, setUser] = useContext(UserContext);
    const [courseInfo, setCourseInfo] = useContext(CourseContext);
    const [lectures, setLectures] = useState([])
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);

    const displayCurrentLectureInfo =()=>{
        return(
            <Message>
                <Message.Header className="pageHeader">{courseInfo.course_name}</Message.Header>
                <p>
                    {currentLecture.current_lecture_name}
                </p>
            </Message>
        )
    }



    const lectureInfo =()=>{
        if(!lectures.length==0){
            return(
                <div>
                    {displayCurrentLectureInfo()}
                    <LectureDropdown lectures={lectures}/>
                </div>
            );
        }
        else{
            return(
                <Message negative>
                    <Message.Header>We're sorry. Your Instructor has not uploaded any lectures for this course.</Message.Header>
                    <p>You may upload lecture content to analyze for this session</p>
                </Message>
            );
        }
    }
    useEffect(() =>{
        fetch('/lectures',
              {
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({'course_access_code': courseInfo.course_access_code})
              }).then(response =>{
                  if(response.ok){
                      response.json().then(data =>{
                          setLectures(data.lectures);
                      });
                  }
                  })
    }, []);


    return(
        <div>
            {lectureInfo()}
            <LectureSlides />
        </div>
    );
}
export default LectureMatch;
