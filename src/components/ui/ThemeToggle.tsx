import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { themeName, toggleTheme, theme } = useTheme();

  const isArcade = themeName === 'arcadeNeon';

  return (
    <motion.button
      className={`px-3 py-1 rounded-full text-sm font-medium ${theme.text} border ${theme.handBorder} hover:bg-white/10 transition-colors`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isArcade ? '🌸 Retro' : '🎮 Arcade'}
    </motion.button>
  );
};

export default ThemeToggle;
