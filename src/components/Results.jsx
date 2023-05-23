import React, {useState, useEffect}  from 'react'
import Fist from './Fist'
import { humanPlayer, computerPlayer } from "./playerClass";

export default function Results(props) {

  return (
    <div className='resultsContainer'>
      <h1>You {props.result}!</h1>
      <div className="playerScoresContainer">
        <div className='scoreContainer'>
          <h1>Player 1</h1>
          <Fist src={humanPlayer.leftThumb ? "../like.png" : "../protest.png"} />
          <Fist src={humanPlayer.rightThumb ? "../like.png" : "../protest.png"} />
          <p>Score: {humanPlayer.getScore()} </p>
        </div>

        <div className='scoreContainer'>
          <h1>Computer</h1>
          <Fist
            class="flip"
            src={computerPlayer.thumbsRaised > 0 ? "../like.png" : "../protest.png"}
          />
          <Fist
            class="flip"
            src={computerPlayer.thumbsRaised > 1 ? "../like.png" : "../protest.png"}
          />
          <p>Score: {computerPlayer.getScore()} </p>
        </div>
      </div>
      <p>Your guess: {humanPlayer.getGuess()}</p>
      <p>Total number of thumbs: {props.totalThumbs}</p>
    </div>
  );
}
