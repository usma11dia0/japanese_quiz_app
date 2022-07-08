import { RootState } from "../app/store";
import { TState } from "../types/types";
import {
  CHANGE_AMOUNT,
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_SCORE,
  CHANGE_TYPE,
} from "./actionsTypes";

const initialState = {
  question_category: "",
  question_difficulty: "",
  question_type: "",
  amount_of_question: 50,
  score: 0,
};

export const reducer = (state: TState = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        question_difficulty: action.payload,
      };
    case CHANGE_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      };
    case CHANGE_TYPE:
      return {
        ...state,
        question_type: action.payload,
      };
    case CHANGE_AMOUNT:
      return {
        ...state,
        amount_of_question: action.payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export const selectQuestionCategory = (state: RootState) =>
  state.reducer.question_category;
export const selectQuestionDifficulty = (state: RootState) =>
  state.reducer.question_difficulty;
export const selectQuestionType = (state: RootState) =>
  state.reducer.question_type;
export const selectAmoutOfQuestion = (state: RootState) =>
  state.reducer.amount_of_question;
export const selectScore = (state: RootState) => state.reducer.score;
