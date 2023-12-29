import { useState } from "react";
import { playRound, playerThumbSelection } from "./services/gameLogic";
import type { RoundResult } from "./types/index";
import Hand from "./components/Hand";

const App = () => {
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

  const handlePlayerGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerGuess(parseInt(e.target.value));
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
    <>
      <div className="mt-10 mb-4 mx-auto flex flex-col items-center gap-2 w-32">
        <p>Turn: {roundMessage}</p>
        <p>Player guess:</p>
        <input
          type="number"
          min="0"
          max="4"
          className="border border-black rounded px-4"
          onChange={handlePlayerGuess}
          value={playerGuess}
          disabled={roundMessage === "AI's turn"}
        />
      </div>

      <div className="flex justify-center gap-10">
        <div className="flex flex-col items-center gap-2" id="player">
          <h1 className="text-4xl">Player</h1>
          <button onClick={handClick} id="left">
            {playerHandCount > 1 ? <Hand isClicked={isLeftClicked} /> : null}
          </button>
          <button onClick={handClick} id="right">
            {playerHandCount > 0 ? <Hand isClicked={isRightClicked} /> : null}
          </button>
        </div>
        <div className="flex flex-col items-center gap-2" id="computer">
          <h1 className="text-4xl">AI</h1>
          {aiHandCount > 1 ? <Hand isClicked={isAILeftClicked} /> : null}
          {aiHandCount > 0 ? <Hand isClicked={isAIRightClicked} /> : null}
        </div>
      </div>

      <div className="mt-5 flex justify-center text-4xl">
        <button
          className="rounded-full border border-blue-500 bg-blue-200 px-4 py-2 flex justify-center items-center"
          onClick={
            isGameOver ? resetGame : isGameStarted ? prepNextRound : startGame
          }
        >
          {isGameOver ? "Start Over" : isGameStarted ? "Next Round" : "Play"}
        </button>
      </div>

      {isGameStarted ? (
        <div className="mt-10 flex flex-col items-center text-4xl">
          <p>Round {round} Results:</p>
          {roundMessage === "AI's turn" ? (
            <p>AI guess: {aiGuess}</p>
          ) : (
            <p>Your guess: {playerGuess}</p>
          )}
          <p>Total thumbs raised: {thumbTotal}</p>
          <p>{resultMessage}</p>
        </div>
      ) : null}
    </>
  );
};

export default App;
