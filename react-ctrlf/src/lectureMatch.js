import React, { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from './userAuthentication';
import { CourseContext } from './courseContext';
import { Dropdown, Message, Button, Input} from 'semantic-ui-react'
import { LectureDropdown } from './Dropdown'
import LectureSlides from './lectureSlides'
import { LectureContext } from './lectureContext';


const LectureMatch = () =>{
    const [user, setUser] = useContext(UserContext);
    const [courseInfo, setCourseInfo] = useContext(CourseContext);
    const [lectures, setLectures] = useState([]);
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);
    const [displayUploadForm, setDisplayUploadForm] = useState(false);
    const [textbookToUpload, setTextbookToUpload] = useState("");
    const [textbookName, setTextbookName] = useState("");
    const [textbookEdition, setTextbookEdition] = useState("");
    const [textbookFName, setTextbookFName] = useState("");
    const [textbookLName, setTextbookLName] = useState("");

    const myFileRef = useRef(null);

    const sendNewTextbook = async(e)=>{
        const formData = new FormData();
        formData.append("textbook", textbookToUpload);
        formData.append("textbookName", textbookName);
        formData.append("textbookEdition", textbookEdition);
        formData.append("textbookFName", textbookFName);
        formData.append("textbookLName", textbookLName);
        const response = await fetch('/uploadTextbook',{
            method:'POST',
            body: formData
        });
    }

    const uploadForm=()=>{
        if (displayUploadForm=="textbook"){
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
                           setTextbookToUpload(e.target.files[0])
                        }}
                    />
                    <Input placeholder='Name' onChange={
                    (e)=>{
                        setTextbookName(e.target.value)
                    }
                    }/>
                    <Input placeholder='Edition' onChange={
                    (e)=>{
                        setTextbookEdition(e.target.value)
                    }
                    }/>
                    <Input placeholder='Author FName' onChange={
                    (e)=>{
                        setTextbookFName(e.target.value)
                    }
                    }/>
                    <Input placeholder='Author LName' onChange={
                    (e)=>{
                        setTextbookLName(e.target.value)
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
                            sendNewTextbook()
                        }
                        }>Save</Button>
                    </Button.Group>
                </div>

            )
        }

    }
    const displayCurrentLectureInfo =()=>{
        return(
            <Message>
                <Message.Header className="pageHeader">{courseInfo.course_name}</Message.Header>
                <p>
                    {currentLecture.current_lecture_name}
                </p>
                <LectureDropdown lectures={lectures}/>
            </Message>
        )
    }



    const lectureInfo =()=>{
        if(!lectures.length==0){
            return(
                <div>
                    {displayCurrentLectureInfo()}
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

    const updateDisplayUploadForm =(e)=>{
            setDisplayUploadForm(e.target.getAttribute("data-content-to-upload"))
    }

    return(
        <div>
            {lectureInfo()}
            <Button
                content="Add Lecture"
            data-content-to-upload="lecture"
                onClick = {updateDisplayUploadForm}
            />
            <Button
                content="Add Textbook"
                data-content-to-upload="textbook"
                onClick = {updateDisplayUploadForm}
            />
            {uploadForm()}
            <LectureSlides />
        </div>
    );
}
export default LectureMatch;
