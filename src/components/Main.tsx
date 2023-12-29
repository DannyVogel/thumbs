import { useState } from "react";
import { playRound, playerThumbSelection } from "../services/gameLogic";
import type { RoundResult } from "../types/index";
import PlayerGuessInput from "./PlayerGuessInput";
import PlayerHands from "./PlayerHands";
import AIHands from "./AIHands";
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

    console.log("results", results);
    processResults(isPlayersTurn, results);
  };

  const processResults = (isPlayersTurn: boolean, results: RoundResult) => {
    if (isPlayersTurn) {
      console.log("player guess", playerGuess);
      if (playerGuess === results.totalThumbsRaised) {
        setResultMessage("You guessed correctly!");
        setRoundWinner("player");
        if (playerHandCount === 1) {
          gameOver("player");
        }
      } else {
        setResultMessage("You guessed incorrectly!");
      }
    } else {
      console.log("ai guess", results.aiGuess);
      if (results.aiGuess === results.totalThumbsRaised) {
        setResultMessage("The AI guessed correctly!");
        setAIGuess(results.aiGuess);
        setRoundWinner("ai");
        if (aiHandCount === 1) {
          gameOver("ai");
        }
      } else {
        setAIGuess(results.aiGuess ? results.aiGuess : 0);
        setResultMessage("The AI guessed incorrectly!");
      }
    }
    setRound(round + 1);
  };

  const prepNextRound = () => {
    if (roundWinner === "player") {
      setPlayerHandCount(playerHandCount - 1);
    } else if (roundWinner === "ai") {
      setAIHandCount(aiHandCount - 1);
    }
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
    setRoundMessage(round % 2 === 0 ? "Player's turn" : "AI's turn");
  };

  const gameOver = (winner: string) => {
    setIsGameOver(true);
    if (winner === "player") {
      setResultMessage("You won!");
    }
    if (winner === "ai") {
      setResultMessage("Ai Won!");
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

  return (
    <div className="bg-indigo-950 min-h-screen text-white flex flex-col items-center">
      <div className="pt-4 mx-auto flex flex-col items-center gap-2 w-52 min-h-40">
        <p className="text-center">Turn: {roundMessage}</p>
        {roundMessage === "Player's turn" ? (
          <PlayerGuessInput
            handlePlayerGuess={handlePlayerGuess}
            totalHandCount={playerHandCount + aiHandCount}
            playerGuess={playerGuess}
          />
        ) : null}
      </div>

      <div className="flex justify-center items-start gap-8 min-h-50 bg-orange-100 rounded-full text-black p-5">
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

      <div className="mt-5 flex justify-center text-4xl">
        <GameButton
          isGameOver={isGameOver}
          isGameStarted={isGameStarted}
          resetGame={resetGame}
          prepNextRound={prepNextRound}
          startGame={startGame}
        />
      </div>

      <div className="mt-10 flex flex-col items-center text-4xl">
        {isGameStarted ? (
          <Results
            round={round}
            turn={roundMessage === "AI's turn" ? "AI" : "Your"}
            guess={roundMessage === "AI's turn" ? aiGuess : playerGuess}
            thumbTotal={thumbTotal}
            resultMessage={resultMessage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Main;
