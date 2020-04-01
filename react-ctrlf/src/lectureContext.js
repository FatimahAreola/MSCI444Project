import React, {useState, createContext} from 'react';

export const LectureContext = createContext();

export const LectureProvider  = props =>{
    const [currentLecture,setCurrentLecture] = useState(
        {
            "current_lecture_id": " ",
            "current_lecture_name": " "
        });
    return (
        <LectureContext.Provider value={[currentLecture,setCurrentLecture]}>
            {props.children}
        </LectureContext.Provider>
    );

};
