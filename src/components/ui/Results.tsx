import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ResultsProps {
  turn: 'Player' | 'AI';
  guess: number;
  thumbTotal: number;
  resultMessage: string;
  isWin: boolean;
}

const Results = ({ turn, guess, thumbTotal, resultMessage, isWin }: ResultsProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <p className={`text-lg ${theme.textMuted}`}>Results</p>
      <motion.p
        className={`text-2xl md:text-3xl font-bold ${isWin ? theme.success : theme.text}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
      >
        {resultMessage}
      </motion.p>
      <motion.div
        className={`flex gap-4 md:gap-8 ${theme.text}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={`px-4 py-2 rounded-lg ${theme.arena} border ${theme.handBorder}`}>
          <p className={`text-sm ${theme.textMuted}`}>{turn}'s Guess</p>
          <p className="text-2xl font-bold text-center">{guess}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${theme.arena} border ${theme.handBorder}`}>
          <p className={`text-sm ${theme.textMuted}`}>Thumbs Up</p>
          <p className="text-2xl font-bold text-center">{thumbTotal}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Results;
