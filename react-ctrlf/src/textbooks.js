import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { TextbookContext } from './textbookContext'

export const TextbookDropdown = ({ textbooks }) =>{
const [currentTextbook, setCurrentTextbook] = useContext(TextbookContext)

    return(

            <Dropdown text='Textbooks' id="lectureDropdown">
            <Dropdown.Menu>

        {
            textbooks.map(textbook=>{
                return(
                    <Dropdown.Item text={textbook.textbook_name} onClick={
                    (e)=>{
                        setCurrentTextbook({"current_tb_id": textbook.textbook_id,
                        "current_tb_name": textbook.textbook_name})
                    }
                    }/>
                )
            })
        }
        </Dropdown.Menu>
            </Dropdown>
    );


}
