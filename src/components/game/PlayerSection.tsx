import { motion } from 'framer-motion';
import HandPair from '../hands/HandPair';
import { useTheme } from '../../context/ThemeContext';

interface PlayerSectionProps {
  handsRemaining: number;
  leftThumbUp: boolean;
  rightThumbUp: boolean;
  onLeftClick: () => void;
  onRightClick: () => void;
  inputLocked: boolean;
}

const PlayerSection = ({
  handsRemaining,
  leftThumbUp,
  rightThumbUp,
  onLeftClick,
  onRightClick,
  inputLocked,
}: PlayerSectionProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <h2 className={`text-2xl md:text-3xl font-bold ${theme.playerAccent}`}>
        Player
      </h2>
      <HandPair
        handsRemaining={handsRemaining}
        leftThumbUp={leftThumbUp}
        rightThumbUp={rightThumbUp}
        isInteractive={true}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        disabled={inputLocked}
        variant="player"
      />
    </motion.div>
  );
};

export default PlayerSection;
