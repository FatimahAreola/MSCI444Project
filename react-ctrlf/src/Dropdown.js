import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { LectureContext } from './lectureContext';

export const LectureDropdown = ({ lectures }) =>{
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);


    const fetch_lecture_content = async(lecture)=>{
       const response = await fetch('/lectureSlides',
          {
              method:'POST',
              headers:{
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({'lecture_id': lecture.lecture_id})
          }).then(response =>{
              if(response.ok){

                  response.json().then(data =>{
                      setCurrentLecture({"current_lecture_id": lecture.lecture_id,
                                         "current_lecture_name": lecture.lecture_name,
                                         "current_lecture": data.lecture_content})
              })
              }
          });
    }

    return(

        <Dropdown text='Lectures' id="lectureDropdown">
            <Dropdown.Menu>

                {
                    lectures.map(lecture=>{
                        return(
                            <Dropdown.Item text={lecture.lecture_name} onClick={
                            (e)=>{
                                fetch_lecture_content(lecture);
                            }}/>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );


}

