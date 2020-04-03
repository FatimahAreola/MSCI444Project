import React, {useState, createContext} from 'react';

export const LectureContext = createContext();

export const LectureProvider  = props =>{
    const [currentLecture,setCurrentLecture] = useState(
        {
            "current_lecture_id": null,
            "current_lecture_name": null,
            "current_lecture": []
        });
    return (
        <LectureContext.Provider value={[currentLecture,setCurrentLecture]}>
            {props.children}
        </LectureContext.Provider>
    );

};
