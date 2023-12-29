type PlayerGuessInputProps = {
  handlePlayerGuess: (value: number) => void;
  totalHandCount: number;
  playerGuess: number;
};

const PlayerGuessInput = ({
  handlePlayerGuess,
  totalHandCount,
  playerGuess,
}: PlayerGuessInputProps) => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i <= totalHandCount; i++) {
      console.log("i", i, "playerGuess", playerGuess);
      buttons.push(
        <button
          key={i}
          id={i.toString()}
          className={`btn btn-sm  ${playerGuess === i ? "btn-warning" : ""}`}
          onClick={() => handlePlayerGuess(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  return (
    <>
      <p className="text-white text-center">
        How many thumbs do you think will be raised in total?
      </p>
      <div className="flex gap-3">{renderButtons()}</div>
    </>
  );
};

export default PlayerGuessInput;
