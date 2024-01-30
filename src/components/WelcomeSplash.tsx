type WelcomeSplashProps = {
  startGame: () => void;
};

const WelcomeSplash = ({ startGame }: WelcomeSplashProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-2">
      <h1 className="text-lg font-bold">Welcome!</h1>
      <div className="max-w-lg text-center flex flex-col gap-2 px-4">
        <p>
          This is a simple japanese game where the objective is to correctly
          guess the total number of thumbs that will be raised amongst players.
        </p>
        <p>
          Player's take turns shouting out "1, 2, 3" followed by the number of
          thumbs they think will be raised in total amongst all players. On the
          count of 3, player's must raise either 1, 2 or no thumbs.
        </p>
        <p>
          You win if you guess the correct number of raised thumbs, allowing you
          to drop one of your hands behind your back. When both of your hands
          drop out of the game (when you are correct for two turns), you are the
          champion.
        </p>
        <p>
          To play a round, click on your thumbs to raise or lower them, select
          your guess for the total number of thumbs and click play!
        </p>
      </div>

      <button className="btn btn-lg bg-blue-100 text-black" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default WelcomeSplash;
