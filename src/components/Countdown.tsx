import { useState, useEffect } from "react";
interface CountdownProps {
  guess: number;
}

const Countdown = ({ guess }: CountdownProps) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => (prevCount < 4 ? prevCount + 1 : 4));
    }, 600);

    return () => clearInterval(countdown);
  }, []);

  return (
    <>
      {count < 4 ? (
        <p className={`text-5xl font-bold transition duration-500 `}>{count}</p>
      ) : (
        <div className="flex flex-col gap-2 text-center">
          <p className="text-6xl font-bold animate-bounce text-orange-400">
            Guess
          </p>
          <p className="text-6xl font-bold animate-bounce text-orange-400">
            {guess}
          </p>
        </div>
      )}
    </>
  );
};

export default Countdown;
