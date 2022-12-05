import React from 'react'

export default function Results(props) {
  const p2Total = (Math.round(Math.random() * 2))
  const totalNumThumb = props.p1Total + p2Total
  console.log(totalNumThumb, props.guess)
  
  return (
    <div>
        <br />
        <div>
            <h1>{totalNumThumb === props.guess ? "You Won!" : "You Lost!"}</h1>
            <div className='player-stats'>
              <div>
               <p>Your thumbs up: {props.p1Total}</p>
               <img className='fist' src={props.p1Total > 0 ? "../like.png" : "../protest.png"} alt="fist" />
               <img className='fist' src={props.p1Total > 1 ? "../like.png" : "../protest.png"} alt="fist" />
              </div>
              
              <div>
                <p>P2 thumbs up: {p2Total}</p>
                <img className='fist flip' src={p2Total > 0 ? "../like.png" : "../protest.png"} alt="fist" />
                <img className='fist flip' src={p2Total > 1 ? "../like.png" : "../protest.png"} alt="fist" />
              </div>
            </div>
            <p>Your guess: {props.guess}</p>
            <p>Total number of thumbs: {totalNumThumb}</p>
        </div>
        <br />
    </div>
  )
}
