import { useReducer } from 'react';
import type { GameState, GameAction } from '../types/gameState';
import { INITIAL_HAND_COUNT, MESSAGES } from '../constants/game';

const initialState: GameState = {
  phase: 'welcome',
  round: 0,
  currentTurn: 'player',
  player: {
    handsRemaining: INITIAL_HAND_COUNT,
    leftThumbUp: false,
    rightThumbUp: false,
    guess: 0,
  },
  ai: {
    handsRemaining: INITIAL_HAND_COUNT,
    leftThumbUp: false,
    rightThumbUp: false,
    guess: null,
  },
  roundResult: null,
  inputLocked: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        phase: 'playing',
      };

    case 'SET_PLAYER_THUMB': {
      if (state.inputLocked) return state;
      return {
        ...state,
        player: {
          ...state.player,
          [action.hand === 'left' ? 'leftThumbUp' : 'rightThumbUp']: action.value,
        },
      };
    }

    case 'SET_PLAYER_GUESS': {
      if (state.inputLocked) return state;
      return {
        ...state,
        player: {
          ...state.player,
          guess: action.guess,
        },
      };
    }

    case 'START_ROUND':
      return {
        ...state,
        phase: 'countdown',
        inputLocked: true,
        roundResult: null,
      };

    case 'SET_AI_THUMBS':
      return {
        ...state,
        ai: {
          ...state.ai,
          leftThumbUp: action.leftThumbUp,
          rightThumbUp: action.rightThumbUp,
        },
      };

    case 'SET_AI_GUESS':
      return {
        ...state,
        ai: {
          ...state.ai,
          guess: action.guess,
        },
      };

    case 'SET_ROUND_RESULT':
      return {
        ...state,
        roundResult: action.result,
      };

    case 'END_COUNTDOWN':
      return {
        ...state,
        phase: 'results',
      };

    case 'NEXT_ROUND': {
      const winner = state.roundResult?.winner;
      const newPlayerHands =
        winner === 'player'
          ? state.player.handsRemaining - 1
          : state.player.handsRemaining;
      const newAIHands =
        winner === 'ai' ? state.ai.handsRemaining - 1 : state.ai.handsRemaining;
      const newRound = state.round + 1;

      return {
        ...state,
        phase: 'playing',
        round: newRound,
        currentTurn: newRound % 2 === 0 ? 'player' : 'ai',
        player: {
          handsRemaining: newPlayerHands,
          leftThumbUp: false,
          rightThumbUp: false,
          guess: 0,
        },
        ai: {
          handsRemaining: newAIHands,
          leftThumbUp: false,
          rightThumbUp: false,
          guess: null,
        },
        roundResult: null,
        inputLocked: false,
      };
    }

    case 'GAME_OVER':
      return {
        ...state,
        phase: 'gameOver',
        roundResult: {
          totalThumbs: state.roundResult?.totalThumbs ?? 0,
          winner: action.winner,
          message: action.winner === 'player' ? MESSAGES.PLAYER_WIN : MESSAGES.AI_WIN,
        },
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        phase: 'playing',
      };

    case 'SHOW_WELCOME':
      return {
        ...initialState,
        phase: 'welcome',
      };

    case 'LOCK_INPUT':
      return {
        ...state,
        inputLocked: true,
      };

    case 'UNLOCK_INPUT':
      return {
        ...state,
        inputLocked: false,
      };

    default:
      return state;
  }
}

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return { state, dispatch };
};

export { initialState };
