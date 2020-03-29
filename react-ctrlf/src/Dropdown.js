import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { LectureContext } from './lectureContext';

export const LectureDropdown = ({ lectures }) =>{
    const [currentLectureID,setCurrentLectureID] = useContext(LectureContext);


    return(
        <Dropdown text='Lectures' id="lectureDropdown">
            <Dropdown.Menu>
                {
                    lectures.map(lecture=>{
                        return(
                            <Dropdown.Item text={lecture.lecture_name} onClick={
                            (e)=>{
                                setCurrentLectureID(lecture.lecture_id);

                            }}/>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    );


}

