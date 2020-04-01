import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { LectureContext } from './lectureContext';

export const LectureDropdown = ({ lectures }) =>{
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);


    return(
        <Dropdown text='Lectures' id="lectureDropdown">
            <Dropdown.Menu>
                {
                    lectures.map(lecture=>{
                        return(
                            <Dropdown.Item text={lecture.lecture_name} onClick={
                            (e)=>{
                                setCurrentLecture({"current_lecture_id": lecture.lecture_id,
                                "current_lecture_name": lecture.lecture_name});
                            }}/>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );


}

