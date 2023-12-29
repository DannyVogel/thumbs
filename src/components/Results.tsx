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
    <div className="mt-10 flex flex-col items-center text-4xl">
      <p>Round {round} Results:</p>
      <p>
        {turn} guess: {guess}
      </p>
      <p>Total thumbs raised: {thumbTotal}</p>
      <p>{resultMessage}</p>
    </div>
  );
};

export default Results;
