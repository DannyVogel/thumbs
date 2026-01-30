import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <motion.div
          className="flex flex-col items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className={`text-5xl md:text-6xl font-bold ${theme.playerAccent} mb-2`}>
              Thumbs
            </h1>
            <p className={`text-xl ${theme.textMuted}`}>A Japanese Counting Game</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-6xl"
          >
            👍
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`${theme.arena} rounded-2xl p-6 max-w-lg`}
          >
            <div className="flex flex-col gap-4 text-center">
              <p>
                Correctly guess the total number of thumbs raised to eliminate one
                of your hands. Win by eliminating both hands first!
              </p>
              <p className={theme.textMuted}>
                Players take turns calling out "1, 2, 3" followed by their guess.
                On 3, everyone raises 0, 1, or 2 thumbs.
              </p>
              <p className={theme.textMuted}>
                Click your hands to toggle thumbs up/down, select your guess, and
                press Play!
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button onClick={onStart}>Start Game</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
