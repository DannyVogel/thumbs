import { motion, AnimatePresence } from 'framer-motion';
import Hand from './Hand';

interface HandPairProps {
  handsRemaining: number;
  leftThumbUp: boolean;
  rightThumbUp: boolean;
  isInteractive?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  disabled?: boolean;
  variant?: 'player' | 'ai';
}

const HandPair = ({
  handsRemaining,
  leftThumbUp,
  rightThumbUp,
  isInteractive = false,
  onLeftClick,
  onRightClick,
  disabled = false,
  variant = 'player',
}: HandPairProps) => {
  const showLeftHand = handsRemaining > 1;
  const showRightHand = handsRemaining > 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatePresence mode="popLayout">
        {showLeftHand && (
          <motion.div
            key="left-hand"
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Hand
              isThumbUp={leftThumbUp}
              isInteractive={isInteractive}
              onClick={onLeftClick}
              disabled={disabled}
              variant={variant}
            />
          </motion.div>
        )}
        {showRightHand && (
          <motion.div
            key="right-hand"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Hand
              isThumbUp={rightThumbUp}
              isInteractive={isInteractive}
              onClick={onRightClick}
              disabled={disabled}
              variant={variant}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandPair;
