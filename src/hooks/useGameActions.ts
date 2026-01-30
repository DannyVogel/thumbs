import type { Dispatch } from 'react';
import type { GameAction, GameState, Turn } from '../types/gameState';
import { playRound, playerThumbSelection } from '../services/gameLogic';
import { MESSAGES, RESULT_DELAY } from '../constants/game';

export const useGameActions = (
  state: GameState,
  dispatch: Dispatch<GameAction>
) => {
  const togglePlayerThumb = (hand: 'left' | 'right') => {
    const currentValue =
      hand === 'left' ? state.player.leftThumbUp : state.player.rightThumbUp;
    dispatch({ type: 'SET_PLAYER_THUMB', hand, value: !currentValue });
  };

  const setPlayerGuess = (guess: number) => {
    dispatch({ type: 'SET_PLAYER_GUESS', guess });
  };

  const startRound = () => {
    dispatch({ type: 'START_ROUND' });

    const isPlayersTurn = state.round % 2 === 0;

    const playerThumbsRaised = playerThumbSelection(
      state.player.handsRemaining,
      state.player.leftThumbUp,
      state.player.rightThumbUp
    );

    const results = playRound(
      state.round,
      state.player.handsRemaining,
      state.ai.handsRemaining,
      playerThumbsRaised
    );

    dispatch({
      type: 'SET_AI_THUMBS',
      leftThumbUp: results.isAILeftThumbUp,
      rightThumbUp: results.isAIRightThumbUp,
    });

    if (results.aiGuess !== null) {
      dispatch({ type: 'SET_AI_GUESS', guess: results.aiGuess });
    }

    processResults(isPlayersTurn, results.totalThumbsRaised, results.aiGuess);
  };

  const processResults = (
    isPlayersTurn: boolean,
    totalThumbs: number,
    aiGuess: number | null
  ) => {
    let winner: Turn | null = null;
    let message: string;
    let isGameOver = false;

    if (isPlayersTurn) {
      if (state.player.guess === totalThumbs) {
        message = MESSAGES.CORRECT_GUESS;
        winner = 'player';
        if (state.player.handsRemaining === 1) {
          isGameOver = true;
        }
      } else {
        message = MESSAGES.WRONG_GUESS;
      }
    } else {
      if (aiGuess === totalThumbs) {
        message = MESSAGES.AI_CORRECT;
        winner = 'ai';
        if (state.ai.handsRemaining === 1) {
          isGameOver = true;
        }
      } else {
        message = MESSAGES.AI_WRONG;
      }
    }

    dispatch({
      type: 'SET_ROUND_RESULT',
      result: { totalThumbs, winner, message },
    });

    setTimeout(() => {
      if (isGameOver && winner) {
        dispatch({ type: 'GAME_OVER', winner });
      } else {
        dispatch({ type: 'END_COUNTDOWN' });
      }
    }, RESULT_DELAY);
  };

  const nextRound = () => {
    dispatch({ type: 'NEXT_ROUND' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const showWelcome = () => {
    dispatch({ type: 'SHOW_WELCOME' });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  return {
    togglePlayerThumb,
    setPlayerGuess,
    startRound,
    nextRound,
    resetGame,
    showWelcome,
    startGame,
  };
};
