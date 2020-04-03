import React, { useState, useContext, useRef, useEffect } from 'react';
import { Button, Message, Form, Input } from 'semantic-ui-react';
import { UserContext } from './userAuthentication'
import { InstructorCourseDD } from './instructorCourseDropdown'
import { CourseContext } from './courseContext';

const InstructorHome = ()=>{
    const [courseCode, setCourseCode] = useState(null)
    const [courseName, setCourseName] = useState("")
    const [courseID, setCourseID] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const [displayCourseForm, setCourseForm] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [displayUploadForm, setDisplayUploadForm] = useState(false)
    const [lectureName, setLectureName] = useState("")
    const [lectureToUpload, setLectureToUpload] = useState("")
    const [courses, setCourses] = useState([]);
    const [courseInfo, setCourseInfo] = useContext(CourseContext);

    const myFileRef = useRef(null);

    const sendNewLecture = async(e)=>{
        const formData = new FormData();
        formData.append("lecture", lectureToUpload);
        formData.append("lecture_name", lectureName);
        formData.append("course_access_code", courseInfo.course_access_code);
        const response = await fetch('/uploadLecture',{
            method:'POST',
            body: formData
        });
        if(response.ok){
            alert("Success!")
        }
    }


    useEffect(() =>{
        fetch('/courses/instructor',
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
    }, []);

    const display_courses = () => {
        if(!displayUploadForm){
            return (<div></div>)
        }
        else{
            courses.map(course=>{
            })
            return(<InstructorCourseDD courses={courses} />)
        }
    }

    const uploadForm=()=>{
        if (displayUploadForm){
            return(
                <div>
                <Button
                    id="uploadButton"
                    content="Choose File"
                    labelPosition="left"
                    icon="file"
                    onClick={(e) =>
                        myFileRef.current.click()}
                />
                <input
                    ref={myFileRef}
                    type="file"
                    hidden
                    onChange = {(e)=>{
                        setLectureToUpload(e.target.files[0])
                    }}
                />
                <Input placeholder='lectureName' onChange={
                    e =>{
                        setLectureName(e.target.value)
                    }
                }/>
                <br></br>
                <br></br>
                <Button.Group>
                    <Button onClick={
                    (e)=>{
                        setDisplayUploadForm(false)
                    }
                    }>Cancel</Button>
                    <Button.Or />
                    <Button color='teal' onClick = {
                    (e)=>{
                        sendNewLecture()
                    }
                    }>Save</Button>
                </Button.Group>
                </div>
            )
        }
        else{
            return(<p></p>)
        }

    }
    const submitNewCourse = async()=>{
        const courseInfo={"course_id": courseID, "course_name":courseName, "course_description": courseDescription, "instructor_id":user.user_id};
        const response = await fetch('/course/add',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseInfo)
        });
        response.json().then(data=>{
            setCourseCode(data.courses[0].course_access_code)
        })
        }
    const displayAddCourseForm = ()=>{
        if(displayCourseForm){
            return(
                <div className="courseForm">
                <Form>
                    <Form.Field>
                        <label>Course ID</label>
                        <input placeholder='e.g., MSCI431' onChange={
                        e =>{
                           setCourseID(e.target.value)
                        }
                        }/>
                    </Form.Field>
                    <Form.Field>
                        <label>Course Name</label>
                        <input placeholder='Course Name' onChange={
                        e =>{
                            setCourseName(e.target.value)
                        }
                        }/>
                    </Form.Field>
                    <Form.Field>
                        <label>Course Description</label>
                        <input placeholder='Course Description' onChange={
                        e =>{
                            setCourseDescription(e.target.value)
                        }
                        }/>
                    </Form.Field>
                    <Button type='submit' onClick={
                    ()=>{
                    submitNewCourse();
                        setCourseForm(false)
                    }
                    }>Submit</Button>
                    <Button type='submit' onClick={()=>{
                        setCourseForm(false)
                    }}>Cancel</Button>
                </Form>
                </div>
            )
        }
        else{
            return(
                <p></p>
            )
        }
    }
    const displayCourseCodeResult = () =>{
        if(courseCode==null){
            return(<p></p>)
        }
        else if(courseCode==false){
            return(
                <Message negative>
                    <Message.Header>We're sorry we couldn't create a course code</Message.Header>
                </Message>
            )
        }
        else{
            return(
            <Message id="courseCodeMessage" positive>
                <Message.Header>Sucess!</Message.Header>
                <p>
                  <b>{courseCode}</b>
                </p>
            </Message>
            )
        }
    }
    return(
        <div>
            <Button color="teal" onClick={
            ()=>{
                setCourseForm(true)
            }
            }>
                Add Course
            </Button>
            {displayAddCourseForm()}
            <Button color="teal" onClick={
            ()=>{
                setDisplayUploadForm(true)
            }
            }>Add Lecture </Button>
            {displayCourseCodeResult()}
            {
                display_courses()
            }
            {uploadForm()}
        </div>
    )
}

export default InstructorHome;



