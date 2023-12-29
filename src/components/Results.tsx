interface ResultsProps {
  round: number;
  turn: string;
  guess: number;
  thumbTotal: number;
  resultMessage: string;
}

const Results = ({
  round,
  turn,
  guess,
  thumbTotal,
  resultMessage,
}: ResultsProps) => {
  return (
    <>
      <p className="text-center">Round {round} Results:</p>
      <p className="text-center">
        {turn} guess: {guess}
      </p>
      <p className="text-center">Total thumbs raised: {thumbTotal}</p>
      <p className="text-center">{resultMessage}</p>
    </>
  );
};

export default Results;
