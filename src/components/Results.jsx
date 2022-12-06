import React, {useState, useEffect}  from 'react'
import Fist from './Fist'

export default function Results(props) {
  let result = ""
  const p2Total = (Math.round(Math.random() * 2))
  const totalNumThumb = props.p1Total + p2Total

  if(totalNumThumb == props.guess) {
    result = (<h1>You Won!</h1>)
  } else {
    result = (<h1>You Lost!</h1>)
  }


  return (
    <div>
        <br />
        <div>
            {result}
            <div className='player-stats'>
              <div>
              <h1>Player 1</h1>
               <p>Thumbs up:</p>
               <Fist src={props.p1Total > 0 ? "../like.png" : "../protest.png"}/> 
               <Fist src={props.p1Total > 1 ? "../like.png" : "../protest.png"}/> 
               <p>Score: 0</p> 
              </div>
              
              <div>
                <h1>Player 2</h1>
                <p>Thumbs up:</p>
                <Fist class="flip" src={p2Total > 0 ? "../like.png" : "../protest.png"}/> 
                <Fist class="flip" src={p2Total > 1 ? "../like.png" : "../protest.png"}/>
                <p>Score: 0 </p> 
              </div>
            </div>
            <p>Your guess: {props.guess}</p>
            <p>Total number of thumbs: {totalNumThumb}</p>
        </div>
        <br />
    </div>
  )
}
