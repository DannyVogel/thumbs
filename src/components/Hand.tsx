interface HandProps {
  isClicked: boolean;
}

const Hand = ({ isClicked }: HandProps) => {
  const fist = "✊";
  const thumb = "👍";

  return <div className="text-4xl py-2">{isClicked ? thumb : fist}</div>;
};

export default Hand;
