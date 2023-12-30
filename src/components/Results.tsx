interface ResultsProps {
  turn: string;
  guess: number;
  thumbTotal: number;
  resultMessage: string;
}

const Results = ({ turn, guess, thumbTotal, resultMessage }: ResultsProps) => {
  return (
    <>
      <p className="text-center">Results:</p>
      <p className="text-center text-2xl font-semibold pb-1">{resultMessage}</p>
      <div className="flex">
        <p className="text-center border-r border-t py-1 w-40">
          {turn} guess: {guess}
        </p>
        <p className="text-center border-l border-t py-1 w-40">
          Thumbs up: {thumbTotal}
        </p>
      </div>
    </>
  );
};

export default Results;
