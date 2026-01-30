import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface HandProps {
  isThumbUp: boolean;
  isInteractive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'player' | 'ai';
}

const Hand = ({
  isThumbUp,
  isInteractive = false,
  onClick,
  disabled = false,
  variant = 'player',
}: HandProps) => {
  const { theme } = useTheme();

  const fist = '✊';
  const thumb = '👍';

  const glowClass = variant === 'player' ? theme.playerGlow : theme.aiGlow;

  const baseClasses = `
    text-6xl md:text-7xl p-4 rounded-2xl border-2 transition-colors
    ${theme.handBg} ${isThumbUp ? theme.handActiveBorder : theme.handBorder}
    ${isThumbUp ? `shadow-lg ${glowClass}` : ''}
  `;

  const interactiveClasses = isInteractive && !disabled
    ? 'cursor-pointer'
    : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.div
      className={`${baseClasses} ${interactiveClasses} ${disabledClasses}`}
      onClick={isInteractive && !disabled ? onClick : undefined}
      whileHover={isInteractive && !disabled ? { scale: 1.08 } : {}}
      whileTap={isInteractive && !disabled ? { scale: 0.95 } : {}}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isThumbUp ? 'thumb' : 'fist'}
          className="block"
          initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 20,
          }}
        >
          {isThumbUp ? thumb : fist}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default Hand;
