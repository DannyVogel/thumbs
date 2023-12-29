import Hand from "./Hand";

interface AIHandsProps {
  handCount: number;
  isLeftClicked: boolean;
  isRightClicked: boolean;
}

const AIHands = ({
  handCount,
  isLeftClicked,
  isRightClicked,
}: AIHandsProps) => {
  return (
    <div className="flex flex-col items-center gap-2 w-32" id="computer">
      <h1 className="text-4xl italic">AI</h1>
      {handCount > 1 ? <Hand isClicked={isLeftClicked} /> : null}
      {handCount > 0 ? <Hand isClicked={isRightClicked} /> : null}
    </div>
  );
};

export default AIHands;
