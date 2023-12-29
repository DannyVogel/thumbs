type PlayerGuessInputProps = {
  handlePlayerGuess: (event: React.ChangeEvent<HTMLInputElement>) => void;
  playerGuess: number;
};

const PlayerGuessInput = ({
  handlePlayerGuess,
  playerGuess,
}: PlayerGuessInputProps) => {
  return (
    <input
      type="number"
      min="0"
      max="4"
      className="border border-black rounded px-4"
      onChange={handlePlayerGuess}
      value={playerGuess}
    />
  );
};

export default PlayerGuessInput;
