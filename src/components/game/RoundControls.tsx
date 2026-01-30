import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface RoundControlsProps {
  totalHandCount: number;
  playerGuess: number;
  onGuessChange: (guess: number) => void;
  isPlayersTurn: boolean;
  inputLocked: boolean;
}

const RoundControls = ({
  totalHandCount,
  playerGuess,
  onGuessChange,
  isPlayersTurn,
  inputLocked,
}: RoundControlsProps) => {
  const { theme } = useTheme();

  if (!isPlayersTurn) {
    return (
      <motion.p
        className={`text-xl md:text-2xl ${theme.text} text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Prepare your thumbs!
      </motion.p>
    );
  }

  const buttons = [];
  for (let i = 0; i <= totalHandCount; i++) {
    buttons.push(
      <motion.button
        key={i}
        className={`
          w-12 h-12 md:w-14 md:h-14 rounded-lg font-bold text-lg md:text-xl
          transition-colors border-2
          ${
            playerGuess === i
              ? `${theme.button} ${theme.buttonText} ${theme.handActiveBorder}`
              : `${theme.handBg} ${theme.text} ${theme.handBorder} hover:bg-white/10`
          }
          ${inputLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => !inputLocked && onGuessChange(i)}
        whileHover={inputLocked ? {} : { scale: 1.1 }}
        whileTap={inputLocked ? {} : { scale: 0.9 }}
      >
        {i}
      </motion.button>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className={`${theme.text} text-center text-lg`}>
        How many thumbs will be raised?
      </p>
      <div className="flex justify-center gap-3 flex-wrap">{buttons}</div>
    </motion.div>
  );
};

export default RoundControls;
