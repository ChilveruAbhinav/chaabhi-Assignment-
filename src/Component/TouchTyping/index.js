import React, {useEffect,useState} from 'react'

import './index.css'


let practiseSentences=[
    "asdfjkl;",
    "zxcmnb",
    "pqowru"
] 

const TouchTyping=()=>{
    // const [words,wordsPressed]=useState(0)
    const [index,setIndex]=useState(0)
    const [userInput,handleUserInput]=useState('')
    const [score,scoreSetting]=useState(0)
    const [accuracy,accuracySetting]=useState(100)
    // const [time,timeSetting]=useState(0)
   // const [buttonClicked,clickButton]=useState(false)
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    
    let practiseText=practiseSentences[index]
    let practiseTextLen=practiseText.length

  

      

  useEffect(() => {
     const intervalId = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
              clearInterval(intervalId);
            } else {
              if (seconds === 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
              } else {
                setSeconds((prevSeconds) => prevSeconds - 1);
              }
            }
          }, 1000);
     
   

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [minutes, seconds]);
    
    const onChangeTyping=event=>{
        const value=event.target.value
        handleUserInput(value)

        if (value===practiseText){
            scoreSetting((prevScore)=>prevScore+practiseTextLen)
            handleUserInput('')
            accuracySetting(100)
            setIndex((prevIn)=>prevIn===practiseSentences.length-1?0:prevIn+1)
        }
    }

     const accuracyCalculations=()=>{
        let correctWords=0
        for (let i=0; i<userInput.length;i++){
            if (userInput[i]===practiseText[i]){
                correctWords+=1
            }
        }

        const percent=(correctWords/practiseTextLen)*100
        accuracySetting(percent.toFixed(2))
       // wordsPressed(correctWords)
     }

     useEffect(() => {
        accuracyCalculations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [userInput]);

      const timeFormat=(time)=>{
        
        return time.toString()
      }

     /* const  onClickStart =()=>{
        clickButton(true)
     } */
    

    return (
        <div className='main-container'>
            <h1 className='main-heading'>Typing Test</h1>
            <p className="practise-sent">{practiseText}</p>
            <input type="text" value={userInput} placeholder="Type the above text here" onChange={onChangeTyping} className="input-text" autofocus/>
            {/* <button type="button" className='button' onClick={onClickStart}>Start Typing</button> */}
            <div className="score-container">
            <p className="timer">Timer : <span className='span-item'>{timeFormat(minutes)} : { timeFormat(seconds)}</span></p>
            <p className="timer">Accuracy :  <span className='span-item'>{accuracy}</span></p>
            <p className="timer">Score : <span className='span-item'>{score}</span></p>
            </div>
        </div>
    )
}

export default TouchTyping