type GameButtonProps = {
  isGameOver: boolean;
  isGameStarted: boolean;
  resetGame: () => void;
  prepNextRound: () => void;
  startGame: () => void;
};

const GameButton = ({
  isGameOver,
  isGameStarted,
  resetGame,
  prepNextRound,
  startGame,
}: GameButtonProps) => {
  const getButtonProps = () => {
    if (isGameOver) {
      return {
        onClick: resetGame,
        children: "Start Over",
      };
    }

    if (isGameStarted) {
      return {
        onClick: prepNextRound,
        children: "Next Round",
      };
    }

    return {
      onClick: startGame,
      children: "Play",
    };
  };

  const buttonProps = getButtonProps();

  return (
    <button
      className="btn btn-wide text-xl font-semibold bg-blue-100 text-black"
      {...buttonProps}
    />
  );
};

export default GameButton;
