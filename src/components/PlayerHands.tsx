import Hand from "./Hand";

type PlayerHandsProps = {
  playerHandCount: number;
  isLeftClicked: boolean;
  isRightClicked: boolean;
  handClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const PlayerHands = ({
  playerHandCount,
  isLeftClicked,
  isRightClicked,
  handClick,
}: PlayerHandsProps) => {
  return (
    <div className="flex flex-col items-center gap-2 w-32" id="player">
      <h1 className="text-4xl italic">Player</h1>
      {playerHandCount > 1 ? (
        <button onClick={handClick} id="left">
          <Hand isClicked={isLeftClicked} />
        </button>
      ) : null}
      <button onClick={handClick} id="right">
        {playerHandCount > 0 ? <Hand isClicked={isRightClicked} /> : null}
      </button>
    </div>
  );
};

export default PlayerHands;
