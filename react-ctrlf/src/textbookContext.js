import React, {useState, createContext} from 'react';

export const TextbookContext = createContext();

export const TextbookProvider  = props =>{
    const [currentTextbook,setCurrentTextbook] = useState(
        {
            "current_tb_id": " ",
            "current_tb_name": " "
        });
    return (
        <TextbookContext.Provider value={[currentTextbook,setCurrentTextbook]}>
        {props.children}
        </TextbookContext.Provider>
    );

};
