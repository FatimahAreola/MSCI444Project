import React, { useContext, useState, useEffect } from 'react';
import { LectureContext } from './lectureContext';
import { Divider, Grid, Segment, Button } from 'semantic-ui-react'
import { TextbookContext } from './textbookContext'

const LectureSlides =()=>{
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);
    const [lectureSlides, setCurrentLectureSlides] = useState([]);
    const [slideCounter, setSlideCounter] = useState(0);
    const [currentTextbook, setCurrentTextbook] = useContext(TextbookContext)

    useEffect(() =>{
        fetch('/lectureSlides',
              {
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({'lecture_id': currentLecture.current_lecture_id})
              }).then(response =>{
                  if(response.ok){
                      response.json().then(data =>{
                          setCurrentLectureSlides(data.lecture_content);
                      });
                  }
              })
    });

    const displayLectureSlides =()=>{
        if(lectureSlides.length==0){
            return(<p></p>)
        }
        else{
            return(
                <div>
                <p>{lectureSlides[slideCounter]}</p>
                <Button color="teal" type="submit" onClick={()=>{
                    setSlideCounter(prevCounter => prevCounter-1);
                }}>
                     Previous Slide
                </Button>
                <Button color="teal" type="submit" onClick={()=>{
                    setSlideCounter(prevCounter => prevCounter+1);
                }}>
                    Next Slide
                </Button>
                </div>

            )
        }
    }

    const displayFindMatchesButton=()=>{
        if(currentTextbook.current_tb_id!=null & currentLecture.current_lecture_id!=null){
            return(
                <Button color="teal" type="submit">
                    Find Matches
                </Button>
            )
        }
    }

    return(
        <div className="splitGrid">
                {
                           displayFindMatchesButton()
                }
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        {displayLectureSlides()}
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid>

        <Divider vertical></Divider>
  </Segment>
        </div>
    );

}
export default LectureSlides;
