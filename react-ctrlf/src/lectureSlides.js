import React, { useContext, useState, useEffect } from 'react';
import { LectureContext } from './lectureContext';
import { Divider, Grid, Segment, Button } from 'semantic-ui-react'


const LectureSlides =()=>{
    const [currentLectureID,setCurrentLectureID] = useContext(LectureContext);
    const [lectureSlides, setCurrentLectureSlides] = useState([]);
    const [slideCounter, setSlideCounter] = useState(0);

    useEffect(() =>{
        fetch('/lectureSlides',
              {
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({'lecture_id': currentLectureID})
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
                <Button type="submit" onClick={()=>{
                    setSlideCounter(prevCounter => prevCounter-1);
                }}>
                     Previous Slide
                </Button>
                <Button type="submit" onClick={()=>{
                    setSlideCounter(prevCounter => prevCounter+1);
                }}>
                    Next Slide
                </Button>
                </div>

            )
        }
    }

    return(
        <div className="splitGrid">
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
