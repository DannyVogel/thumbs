import { useState, useEffect } from "react";
import { playRound, playerThumbSelection } from "../services/gameLogic";
import type { RoundResult } from "../types/index";
import PlayerGuessInput from "./PlayerGuessInput";
import PlayerHands from "./PlayerHands";
import AIHands from "./AIHands";
import Countdown from "./Countdown";
import GameButton from "./GameButton";
import Results from "./Results";

const Main = () => {
  const [playerGuess, setPlayerGuess] = useState(0);
  const [playerHandCount, setPlayerHandCount] = useState(2);
  const [isLeftClicked, setIsLeftClicked] = useState(false);
  const [isRightClicked, setIsRightClicked] = useState(false);

  const [aiGuess, setAIGuess] = useState(0);
  const [aiHandCount, setAIHandCount] = useState(2);
  const [isAILeftClicked, setIsAILeftClicked] = useState(false);
  const [isAIRightClicked, setIsAIRightClicked] = useState(false);

  const [thumbTotal, setThumbTotal] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [roundWinner, setRoundWinner] = useState("");
  const [round, setRound] = useState(0);
  const [roundMessage, setRoundMessage] = useState("Player's turn");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handlePlayerGuess = (value: number) => {
    setPlayerGuess(value);
  };

  const handClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hand = e.currentTarget.id;
    hand === "left"
      ? setIsLeftClicked(!isLeftClicked)
      : setIsRightClicked(!isRightClicked);
  };

  const startGame = () => {
    setIsGameStarted(true);
    setShowCountdown(true);
    setResultMessage("");
    setRoundWinner("");
    const isPlayersTurn = round % 2 === 0;

    const playerThumbsRaised = playerThumbSelection(
      playerHandCount,
      isLeftClicked,
      isRightClicked
    );

    const results = playRound(
      round,
      playerHandCount,
      aiHandCount,
      playerThumbsRaised
    );

    setIsAILeftClicked(results.isAILeftThumbUp);
    setIsAIRightClicked(results.isAIRightThumbUp);

    setThumbTotal(results.totalThumbsRaised);

    processResults(isPlayersTurn, results);
  };

  const processResults = (isPlayersTurn: boolean, results: RoundResult) => {
    if (isPlayersTurn) {
      if (playerGuess === results.totalThumbsRaised) {
        setResultMessage("You guessed right!");
        setRoundWinner("player");
        if (playerHandCount === 1) {
          gameOver("player");
        }
      } else {
        setResultMessage("Wrong guess!");
      }
    } else {
      if (results.aiGuess === results.totalThumbsRaised) {
        setResultMessage("AI guessed right!");
        setAIGuess(results.aiGuess);
        setRoundWinner("ai");
        if (aiHandCount === 1) {
          gameOver("ai");
        }
      } else {
        results.aiGuess && setAIGuess(results.aiGuess);
        setResultMessage("AI guessed wrong!");
      }
    }
    setTimeout(() => {
      setShowCountdown(false);
    }, 3500);
  };

  const prepNextRound = () => {
    if (roundWinner === "player") {
      setPlayerHandCount(playerHandCount - 1);
    } else if (roundWinner === "ai") {
      setAIHandCount(aiHandCount - 1);
    }
    setRound(round + 1);
    setRoundWinner("");
    setPlayerGuess(0);
    setAIGuess(0);
    setIsLeftClicked(false);
    setIsRightClicked(false);
    setIsAILeftClicked(false);
    setIsAIRightClicked(false);
    setThumbTotal(0);
    setResultMessage("");
    setIsGameStarted(false);
  };

  useEffect(() => {
    setRoundMessage(round % 2 === 0 ? "Player's turn" : "AI's turn");
  }, [round]);

  const gameOver = (winner: string) => {
    setIsGameOver(true);
    if (winner === "player") {
      setResultMessage("You won!");
    }
    if (winner === "ai") {
      setResultMessage("AI Won!");
    }
  };

  const resetGame = () => {
    setPlayerGuess(0);
    setPlayerHandCount(2);
    setIsLeftClicked(false);
    setIsRightClicked(false);

    setAIGuess(0);
    setAIHandCount(2);
    setIsAILeftClicked(false);
    setIsAIRightClicked(false);

    setThumbTotal(0);
    setResultMessage("");
    setRound(0);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  // useEffect(() => {
  //   if (isGameStarted) {
  //     const intervalid = setInterval(() => {
  //       setCounter((prevState) => (prevState -= 1));
  //     }, 1000);
  //     if (counter === 0) {
  //       clearInterval(intervalid);
  //     }
  //   }
  //   return;
  // }, [isGameStarted]);

  return (
    <div className="bg-indigo-950 min-h-screen text-white flex flex-col items-center">
      <div className="my-4">
        <p className="text-center text-lg font-semibold">Round {round + 1}</p>
        <p className="text-center text-lg font-semibold">{roundMessage}</p>
      </div>

      <div className="flex justify-center items-start gap-8 min-h-50 bg-orange-100 rounded-3xl text-black p-5 min-h-52">
        <PlayerHands
          playerHandCount={playerHandCount}
          isLeftClicked={isLeftClicked}
          isRightClicked={isRightClicked}
          handClick={handClick}
        />

        <AIHands
          handCount={aiHandCount}
          isLeftClicked={isAILeftClicked}
          isRightClicked={isAIRightClicked}
        />
      </div>

      <div className="mt-4 flex flex-col items-center min-h-28">
        {isGameStarted ? (
          <div className="text-xl">
            <Results
              turn={roundMessage === "AI's turn" ? "AI" : "Your"}
              guess={roundMessage === "AI's turn" ? aiGuess : playerGuess}
              thumbTotal={thumbTotal}
              resultMessage={resultMessage}
            />
          </div>
        ) : roundMessage === "Player's turn" ? (
          <PlayerGuessInput
            handlePlayerGuess={handlePlayerGuess}
            totalHandCount={playerHandCount + aiHandCount}
            playerGuess={playerGuess}
          />
        ) : (
          <p className="pt-10 text-center text-xl">Prepare your thumbs!</p>
        )}
      </div>
      <div className="mt-4 flex justify-center text-4xl">
        <GameButton
          isGameOver={isGameOver}
          isGameStarted={isGameStarted}
          resetGame={resetGame}
          prepNextRound={prepNextRound}
          startGame={startGame}
        />
      </div>
      {showCountdown ? (
        <>
          <div className="fixed top-0 right-0 h-full w-full bg-black opacity-50 z-10"></div>
          <div className="fixed bottom-0 sm:bottom-1/2 sm:translate-y-1/2 right-1/2 translate-x-1/2 w-full sm:w-64 bg-slate-800 z-20 rounded-t-lg sm:rounded-lg max-w-xl flex justify-center items-center sm:h-40 h-72">
            <Countdown
              guess={roundMessage === "Player's turn" ? playerGuess : aiGuess}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Main;
