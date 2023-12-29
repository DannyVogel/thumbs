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
      className="rounded-full border border-blue-500 bg-blue-200 px-4 py-2 flex justify-center items-center"
      {...buttonProps}
    />
  );
};

export default GameButton;
