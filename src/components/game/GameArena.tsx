import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../../hooks/useGameState';
import { useGameActions } from '../../hooks/useGameActions';
import { useTheme } from '../../context/ThemeContext';
import PlayerSection from './PlayerSection';
import AISection from './AISection';
import RoundControls from './RoundControls';
import Button from '../ui/Button';
import Countdown from '../ui/Countdown';
import Results from '../ui/Results';
import ThemeToggle from '../ui/ThemeToggle';
import WelcomeScreen from '../screens/WelcomeScreen';
import GameOverScreen from '../screens/GameOverScreen';
import { MESSAGES } from '../../constants/game';

const GameArena = () => {
  const { state, dispatch } = useGameState();
  const actions = useGameActions(state, dispatch);
  const { theme } = useTheme();

  const isPlayersTurn = state.round % 2 === 0;
  const turnMessage = isPlayersTurn ? MESSAGES.PLAYER_TURN : MESSAGES.AI_TURN;

  if (state.phase === 'welcome') {
    return <WelcomeScreen onStart={actions.startGame} />;
  }

  if (state.phase === 'gameOver') {
    return (
      <GameOverScreen
        winner={state.roundResult?.winner ?? 'player'}
        onPlayAgain={actions.resetGame}
        onShowRules={actions.showWelcome}
      />
    );
  }

  const showCountdown = state.phase === 'countdown';
  const showResults = state.phase === 'results';

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-4`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className={`text-3xl md:text-4xl font-bold ${theme.playerAccent}`}>
              Thumbs
            </h1>
          </motion.div>
          <div className="flex items-center gap-3">
            <Button variant="small" onClick={actions.showWelcome}>
              ?
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Round Info */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className={`text-lg font-semibold ${theme.text}`}>
            Round {state.round + 1}
          </p>
          <p className={`text-xl font-bold ${isPlayersTurn ? theme.playerAccent : theme.aiAccent}`}>
            {turnMessage}
          </p>
        </motion.div>

        {/* Game Arena */}
        <motion.div
          className={`${theme.arena} rounded-3xl p-6 md:p-8 mb-6`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="flex justify-center items-start gap-8 md:gap-16 min-h-[280px]">
            <PlayerSection
              handsRemaining={state.player.handsRemaining}
              leftThumbUp={state.player.leftThumbUp}
              rightThumbUp={state.player.rightThumbUp}
              onLeftClick={() => actions.togglePlayerThumb('left')}
              onRightClick={() => actions.togglePlayerThumb('right')}
              inputLocked={state.inputLocked}
            />
            <AISection
              handsRemaining={state.ai.handsRemaining}
              leftThumbUp={showResults ? state.ai.leftThumbUp : false}
              rightThumbUp={showResults ? state.ai.rightThumbUp : false}
            />
          </div>
        </motion.div>

        {/* Controls / Results */}
        <div className="min-h-[140px] flex flex-col items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {showResults && state.roundResult ? (
              <Results
                key="results"
                turn={isPlayersTurn ? 'Player' : 'AI'}
                guess={isPlayersTurn ? state.player.guess : (state.ai.guess ?? 0)}
                thumbTotal={state.roundResult.totalThumbs}
                resultMessage={state.roundResult.message}
                isWin={state.roundResult.winner !== null}
              />
            ) : !showCountdown ? (
              <RoundControls
                key="controls"
                totalHandCount={state.player.handsRemaining + state.ai.handsRemaining}
                playerGuess={state.player.guess}
                onGuessChange={actions.setPlayerGuess}
                isPlayersTurn={isPlayersTurn}
                inputLocked={state.inputLocked}
              />
            ) : null}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="next"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button onClick={actions.nextRound}>Next Round</Button>
              </motion.div>
            ) : !showCountdown ? (
              <motion.div
                key="play"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button onClick={actions.startRound}>Play</Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Countdown Modal */}
      <AnimatePresence>
        {showCountdown && (
          <>
            <motion.div
              className={`fixed inset-0 ${theme.overlay} z-40`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className={`fixed inset-0 z-50 flex items-center justify-center p-4`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div
                className={`${theme.modal} rounded-2xl p-8 md:p-12 w-full max-w-md shadow-2xl`}
              >
                <Countdown
                  guess={isPlayersTurn ? state.player.guess : (state.ai.guess ?? 0)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameArena;
