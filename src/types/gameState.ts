export type GamePhase = 'welcome' | 'playing' | 'countdown' | 'results' | 'gameOver';

export type Turn = 'player' | 'ai';

export interface HandState {
  leftThumbUp: boolean;
  rightThumbUp: boolean;
}

export interface PlayerState extends HandState {
  handsRemaining: number;
  guess: number;
}

export interface AIState extends HandState {
  handsRemaining: number;
  guess: number | null;
}

export interface RoundResultState {
  totalThumbs: number;
  winner: Turn | null;
  message: string;
}

export interface GameState {
  phase: GamePhase;
  round: number;
  currentTurn: Turn;
  player: PlayerState;
  ai: AIState;
  roundResult: RoundResultState | null;
  inputLocked: boolean;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SET_PLAYER_THUMB'; hand: 'left' | 'right'; value: boolean }
  | { type: 'SET_PLAYER_GUESS'; guess: number }
  | { type: 'START_ROUND' }
  | { type: 'SET_AI_THUMBS'; leftThumbUp: boolean; rightThumbUp: boolean }
  | { type: 'SET_ROUND_RESULT'; result: RoundResultState }
  | { type: 'SET_AI_GUESS'; guess: number }
  | { type: 'END_COUNTDOWN' }
  | { type: 'NEXT_ROUND' }
  | { type: 'GAME_OVER'; winner: Turn }
  | { type: 'RESET_GAME' }
  | { type: 'SHOW_WELCOME' }
  | { type: 'LOCK_INPUT' }
  | { type: 'UNLOCK_INPUT' };
