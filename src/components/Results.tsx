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
      <p>Round {round} Results:</p>
      <p>
        {turn} guess: {guess}
      </p>
      <p>Total thumbs raised: {thumbTotal}</p>
      <p>{resultMessage}</p>
    </>
  );
};

export default Results;
