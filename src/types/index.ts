export type RoundResult = PlayerRoundResult | AIRoundResult;

export interface PlayerRoundResult {
  totalThumbsRaised: number;
  isAILeftThumbUp: boolean;
  isAIRightThumbUp: boolean;
  aiGuess: null;
}

export interface AIRoundResult {
  totalThumbsRaised: number;
  isAILeftThumbUp: boolean;
  isAIRightThumbUp: boolean;
  aiGuess: number;
}

export interface AISelection {
  isAILeftThumbUp: boolean;
  isAIRightThumbUp: boolean;
  aiThumbsRaised: number;
}
