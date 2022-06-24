import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  CHANGE_SCORE,
} from "./actionsTypes";

export const handleCategoryChange = (payload: string) => ({
  type: CHANGE_CATEGORY,
  payload,
});

export const handleDifficultyChange = (payload: string) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});

export const handleTypeChange = (payload: string) => ({
  type: CHANGE_TYPE,
  payload,
});

export const handleAmountChange = (payload: number) => ({
  type: CHANGE_AMOUNT,
  payload,
});

export const handleScoreChange = (payload: number) => ({
  type: CHANGE_SCORE,
  payload,
});
