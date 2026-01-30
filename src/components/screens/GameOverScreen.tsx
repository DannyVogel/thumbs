import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import type { Turn } from '../../types/gameState';

interface GameOverScreenProps {
  winner: Turn;
  onPlayAgain: () => void;
  onShowRules: () => void;
}

const GameOverScreen = ({ winner, onPlayAgain, onShowRules }: GameOverScreenProps) => {
  const { theme } = useTheme();
  const isPlayerWin = winner === 'player';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-4 flex items-center justify-center`}>
      <motion.div
        className="text-center flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="text-8xl"
          animate={{
            rotate: isPlayerWin ? [0, -10, 10, -10, 10, 0] : [0, 5, -5, 0],
            scale: isPlayerWin ? [1, 1.2, 1] : [1, 0.95, 1],
          }}
          transition={{
            duration: isPlayerWin ? 0.8 : 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {isPlayerWin ? '🎉' : '🤖'}
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-5xl md:text-6xl font-bold ${isPlayerWin ? theme.success : theme.aiAccent}`}
        >
          {isPlayerWin ? 'You Won!' : 'AI Wins!'}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`text-xl ${theme.textMuted}`}
        >
          {isPlayerWin
            ? 'Congratulations! You outsmarted the AI!'
            : 'Better luck next time!'}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4"
        >
          <Button onClick={onPlayAgain}>Play Again</Button>
          <Button variant="secondary" onClick={onShowRules}>
            Back to Menu
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameOverScreen;
