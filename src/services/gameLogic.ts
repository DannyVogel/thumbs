import type {
  RoundResult,
  PlayerRoundResult,
  AIRoundResult,
  AISelection,
} from "../types/index.ts";

export const playRound = (
  round: number,
  playerHandCount: number,
  aiHandCount: number,
  playerThumbsRaised: number
): RoundResult => {
  const isPlayersTurn = round % 2 === 0;
  isPlayersTurn ? console.log("player turn") : console.log("ai turn");

  if (isPlayersTurn) {
    return playerTurn(aiHandCount, playerThumbsRaised);
  } else {
    return aiTurn(playerHandCount, aiHandCount, playerThumbsRaised);
  }
};

const playerTurn = (
  aiHandCount: number,
  playerThumbsRaised: number
): PlayerRoundResult => {
  let totalThumbsRaised = 0;
  const aiSelection = aiThumbSelection(aiHandCount);
  totalThumbsRaised = aiSelection.aiThumbsRaised + playerThumbsRaised;
  return {
    totalThumbsRaised: totalThumbsRaised,
    isAILeftThumbUp: aiSelection.isAILeftThumbUp,
    isAIRightThumbUp: aiSelection.isAIRightThumbUp,
    aiGuess: null,
  };
};

const aiTurn = (
  playerHandCount: number,
  aiHandCount: number,
  playerThumbsRaised: number
): AIRoundResult => {
  let totalThumbsRaised = 0;
  let aiGuess = 0;
  const totalHandCount = playerHandCount + aiHandCount;
  const aiSelection = aiThumbSelection(aiHandCount);
  console.log(
    "beforeGuess",
    "totalHandCount",
    totalHandCount,
    "aiSelection.aiThumbsRaised",
    aiSelection.aiThumbsRaised
  );
  aiGuess = getAIGuess(totalHandCount, aiSelection.aiThumbsRaised);
  console.log("aiGuess", aiGuess);
  totalThumbsRaised = aiSelection.aiThumbsRaised + playerThumbsRaised;
  return {
    totalThumbsRaised: totalThumbsRaised,
    isAILeftThumbUp: aiSelection.isAILeftThumbUp,
    isAIRightThumbUp: aiSelection.isAIRightThumbUp,
    aiGuess: aiGuess,
  };
};

const getAIGuess = (totalHandCount: number, aiThumbsRaised: number): number => {
  return (
    Math.floor(Math.random() * (totalHandCount - aiThumbsRaised)) +
    aiThumbsRaised
  );
};

const aiThumbSelection = (aiHandCount: number): AISelection => {
  let aiThumbsRaised = 0;
  const isAILeftThumbUp = Math.random() >= 0.5;
  const isAIRightThumbUp = Math.random() >= 0.5;
  if (isAILeftThumbUp && aiHandCount > 1) {
    aiThumbsRaised++;
  }
  if (isAIRightThumbUp) {
    aiThumbsRaised++;
  }
  console.log("aiSelection", {
    isAILeftThumbUp: isAILeftThumbUp,
    isAIRightThumbUp: isAIRightThumbUp,
    aiThumbsRaised: aiThumbsRaised,
  });
  return {
    isAILeftThumbUp: isAILeftThumbUp,
    isAIRightThumbUp: isAIRightThumbUp,
    aiThumbsRaised: aiThumbsRaised,
  };
};

export const playerThumbSelection = (
  playerHandCount: number,
  isLeftClicked: boolean,
  isRightClicked: boolean
): number => {
  let playerThumbsRaised = 0;
  if (playerHandCount > 1) {
    playerThumbsRaised += isLeftClicked ? 1 : 0;
  }
  playerThumbsRaised += isRightClicked ? 1 : 0;
  return playerThumbsRaised;
};
