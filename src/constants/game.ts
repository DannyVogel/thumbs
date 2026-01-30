// Game constants
export const INITIAL_HAND_COUNT = 2;
export const COUNTDOWN_DURATION = 600; // ms per count
export const COUNTDOWN_TOTAL = 3;
export const RESULT_DELAY = 3500; // ms before hiding countdown

// Player types
export const PLAYER = 'player' as const;
export const AI = 'ai' as const;

// Game phases
export const PHASES = {
  WELCOME: 'welcome',
  PLAYING: 'playing',
  COUNTDOWN: 'countdown',
  RESULTS: 'results',
  GAME_OVER: 'gameOver',
} as const;

// Messages
export const MESSAGES = {
  PLAYER_TURN: "Player's turn",
  AI_TURN: "AI's turn",
  PLAYER_WIN: 'You won!',
  AI_WIN: 'AI Won!',
  CORRECT_GUESS: 'You guessed right!',
  WRONG_GUESS: 'Wrong guess!',
  AI_CORRECT: 'AI guessed right!',
  AI_WRONG: 'AI guessed wrong!',
  PREPARE_THUMBS: 'Prepare your thumbs!',
} as const;
