import React, {useState, useEffect} from "react";
import Results from "./Results";
import { humanPlayer, computerPlayer } from "./playerClass";


function Input() {
    const [playerInput, setPlayerInput] = useState({
      clickedL: false,
      clickedR: false,
      numThumb: 0,
      guess: 0,
    });
    const [totalThumbs, setTotalThumbs] = useState(0);
    const [show, setShow] = useState(false);
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);

    function handleClick(event) {
      const { name, value } = event.target;

      setPlayerInput((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
        numThumb: !prevState[name] ? prevState.numThumb + 1 : prevState.numThumb - 1,
        guess: !prevState[name] ? prevState.guess + 1 : prevState.guess - 1
      }));
    }

    function handleChange(event) {
        setPlayerInput((prevState) => ({
            ...prevState,
            guess: Number(event.target.value),
        }));
    }

    function playRound() {
      console.log("init Scores: ", humanPlayer.getScore(), computerPlayer.getScore())
      playerInput.clickedL && humanPlayer.setLeftThumb();
      playerInput.clickedR && humanPlayer.setRightThumb();
      humanPlayer.setGuess(playerInput.guess);
      calculateRoundResult(getTotalThumbNum())
      setShow((prevState) => !prevState);
    }

    function getTotalThumbNum() {
      computerPlayer.setThumbsRandom();
      let totalThumbs = computerPlayer.thumbsRaised;
      humanPlayer.getThumbs().leftThumb && totalThumbs++;
      humanPlayer.getThumbs().rightThumb && totalThumbs++;
      return totalThumbs
    }

    function calculateRoundResult(thumbNum) {
        console.log("adding score" , humanPlayer.getGuess(), thumbNum)
        setTotalThumbs(thumbNum);
        if (thumbNum == humanPlayer.getGuess()) {
          humanPlayer.winsRound();
          setResult("Won");
        } else {
          computerPlayer.winsRound();
          setResult("Lost");
        }
        console.log("end Scores: ", humanPlayer.getScore(), computerPlayer.getScore())
      }

      function resetRound() {
        setPlayerInput({
            clickedL: false,
            clickedR: false,
            numThumb: 0,
            guess: 0,
            });
        setTotalThumbs(0);
        setShow((prevState) => !prevState);
        setResult("");
        humanPlayer.resetRound();
        computerPlayer.resetRound();
        }

    const styles1 = {
      backgroundColor: playerInput.clickedL === true ? "#C060A1" : null,
    };
    const styles2 = {
      backgroundColor: playerInput.clickedR === true ? "#C060A1" : null,
    };
    console.log(playerInput, humanPlayer, computerPlayer, totalThumbs);

    return (
      <div className="inputContainer">
        <div className="thumbBtnContainer">
          <button
            className="button"
            onClick={!show ? handleClick : undefined}
            name="clickedL"
            value={playerInput.clickedL}
            style={styles1}
          >
            Left Thumb
          </button>
          <button
            className="button"
            onClick={!show ? handleClick : undefined}
            name="clickedR"
            value={playerInput.clickedR}
            style={styles2}
          >
            Right Thumb
          </button>
        </div>
        <br />
        <div className="guessContainer">
          <label htmlFor="guess">
            <strong>
              How many thumbs do you think will be raised in total?
            </strong>
          </label>
          {/* use HTML Select element or create buttons for pressing number of thumbs up (2nd better for when 1 point won) */}
          <input
            type="number"
            name="guess"
            onChange={!show ? handleChange : undefined}
            value={playerInput.guess}
            maxLength="1"
            min={playerInput.numThumb}
            max={4}
            required
            autoFocus
          />
        </div>
        <br />
        <div>
          <button
            className="button submit"
            type="submit"
            onClick={show ? resetRound : playRound}
          >
            {show ? "PLAY AGAIN" : "PLAY"}
          </button>
        </div>
        <br />
        {!show && (
          <img
            className="fist-bump-img"
            src="../fist-bump.png"
            alt="fist bump"
          />
        )}
        {show ? (
          <Results
            result={result}
            totalThumbs={totalThumbs}
          />
        ) : (
          <h1>Good luck!</h1>
        )}
      </div>
    );
}

export default Input;