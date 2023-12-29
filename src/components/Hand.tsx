interface HandProps {
    isClicked: boolean;
  }
  
  const Hand = ({isClicked}: HandProps) => {
    const fist = "✊";
    const thumb = "👍";
  
    return <div className="text-4xl">{isClicked ? thumb : fist}</div>;
  };
  
  export default Hand;