import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { COUNTDOWN_DURATION, COUNTDOWN_TOTAL } from '../../constants/game';

interface CountdownProps {
  guess: number;
  onComplete?: () => void;
}

const Countdown = ({ guess, onComplete }: CountdownProps) => {
  const [count, setCount] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < COUNTDOWN_TOTAL + 1) {
          return prevCount + 1;
        }
        return prevCount;
      });
    }, COUNTDOWN_DURATION);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (count > COUNTDOWN_TOTAL && onComplete) {
      onComplete();
    }
  }, [count, onComplete]);

  const showGuess = count > COUNTDOWN_TOTAL;

  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {!showGuess ? (
          <motion.p
            key={count}
            className={`text-8xl font-bold ${theme.text}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {count}
          </motion.p>
        ) : (
          <motion.div
            key="guess"
            className="w-full flex flex-col gap-4 text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.p
              className={`text-5xl md:text-6xl font-bold ${theme.playerAccent}`}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              Guess
            </motion.p>
            <motion.p
              className={`text-7xl md:text-8xl font-bold ${theme.playerAccent}`}
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.1,
              }}
            >
              {guess}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Countdown;
