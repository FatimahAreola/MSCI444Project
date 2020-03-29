import React, {useState, createContext} from 'react';

export const LectureContext = createContext();

export const LectureProvider  = props =>{
    const [currentLectureID,setCurrentLectureID] = useState(" lecture init");
    return (
        <LectureContext.Provider value={[currentLectureID,setCurrentLectureID]}>
            {props.children}
        </LectureContext.Provider>
    );

};
