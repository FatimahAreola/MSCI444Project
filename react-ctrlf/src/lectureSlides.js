import React, { useContext, useState, useEffect } from 'react';
import { LectureContext } from './lectureContext';
import { Divider, Grid, Segment, Button } from 'semantic-ui-react'
import { TextbookContext } from './textbookContext'

const LectureSlides =()=>{
    const [currentLecture,setCurrentLecture] = useContext(LectureContext);
    const [lectureSlides, setCurrentLectureSlides] = useState([]);
    const [MatchesSlides, setCurrentMatchesSlides] = useState([]);
    const [matchCounter, setMatchCounter] = useState(0);
    const [slideCounter, setSlideCounter] = useState(0);
    const [currentTextbook, setCurrentTextbook] = useContext(TextbookContext);


    const displayLectureSlides =()=>{
        if(currentLecture.current_lecture.length==0){
            return(<p></p>)
        }
        else{
            return(
                <div>
                <p>{currentLecture.current_lecture[slideCounter]}</p>
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


    const findMatches = async()=>{
        const info={"lectureContent": currentLecture.current_lecture[slideCounter], "textbookID": currentTextbook.current_tb_id};
        const response = await fetch('/match',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        response.json().then(data=>{
            alert(data.matches.length)
            setCurrentMatchesSlides(data.matches)
        })
    }

    const displayFindMatchesButton=()=>{
        if(currentTextbook.current_tb_id!=null & currentLecture.current_lecture_id!=null){
            return(
                <Button color="teal" type="submit" onClick={()=>{
                    findMatches()
                }}>
                    Find Matches
                </Button>
            )
        }
    }

    const displayMatches =()=>{
        if(MatchesSlides.length==0){
            return(<p>{MatchesSlides[slideCounter]}</p>)
        }
        else{
            return(
                <div>
                <p>{MatchesSlides[matchCounter]}</p>
                <Button color="teal" type="submit" onClick={()=>{
                    setMatchCounter(prevCounter => prevCounter-1);
                }}>
                     Previous Match
                </Button>
                <Button color="teal" type="submit" onClick={()=>{
                    setMatchCounter(prevCounter => prevCounter+1);
                }}>
                    Next Match
                </Button>
                </div>

            )
        }
    }

    return(
        <div className="splitGrid">
                    <p>
                    <b>
                    {currentLecture.current_lecture_name}
                    </b>
                    </p>
                    <p>
                    <b>
                    {currentTextbook.current_tb_name}
                    </b>
                    </p>
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        {displayLectureSlides()}
                    </Grid.Column>
                    <Grid.Column>
                        {displayMatches()}
                    </Grid.Column>
                </Grid>

        <Divider vertical></Divider>
  </Segment>
  {
      displayFindMatchesButton()
  }
        </div>
    );

}
export default LectureSlides;


