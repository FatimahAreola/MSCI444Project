import React, {useState, createContext} from 'react';

export const CourseContext = createContext();

export const CourseProvider  = props =>{
    const [courseInfo,setCourseInfo] = useState(
        {
            course_access_code: "access code init ",
            course_name: "course name init"
        }

    );
    return (
            <CourseContext.Provider value={[courseInfo,setCourseInfo]}>
                {props.children}
        </CourseContext.Provider>
    );

};

