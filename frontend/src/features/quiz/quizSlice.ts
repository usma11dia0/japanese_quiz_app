import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import axios from "axios";
import { READ_CHOICE, READ_QUIZ, QUIZ_STATE } from "../types";

export const fetchAsyncGetQuizzes = createAsyncThunk(
  "quiz/getQuizzes",
  async () => {
    const res = await axios.get<READ_QUIZ[]>(
      `${process.env.REACT_APP_API_URL}/api/quizzes`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetChoices = createAsyncThunk(
  "quiz/getChoices",
  async () => {
    const res = await axios.get<READ_CHOICE[]>(
      `${process.env.REACT_APP_API_URL}/api/choices/`,
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const initialState: QUIZ_STATE = {
  quizzes: [
    {
      question_id: "",
      question_text: "",
      created_at: "",
      updated_at: "",
    },
  ],
  selectedQuiz: {
    question_id: "",
    question_text: "",
    created_at: "",
    updated_at: "",
  },
  choices: [
    {
      quiz: "",
      quiz_question_text: "",
      choice_text: "",
      choice_alphabet: "",
      answer_explanation: "",
      image_choice_src: "",
      audio_choice_src: "",
      created_at: "",
      updated_at: "",
    },
  ],
  selectedChoice: {
    quiz: "",
    quiz_question_text: "",
    choice_text: "",
    choice_alphabet: "",
    answer_explanation: "",
    image_choice_src: "",
    audio_choice_src: "",
    created_at: "",
    updated_at: "",
  },
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectQuiz(state, action: PayloadAction<READ_QUIZ>) {
      state.selectedQuiz = action.payload;
    },
    selectChoice(state, action: PayloadAction<READ_CHOICE>) {
      state.selectedChoice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetQuizzes.fulfilled,
      (state, action: PayloadAction<READ_QUIZ[]>) => {
        return {
          ...state,
          quizzes: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetQuizzes.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(
      fetchAsyncGetChoices.fulfilled,
      (state, action: PayloadAction<READ_CHOICE[]>) => {
        return {
          ...state,
          choices: action.payload,
        };
      }
    );
    builder.addCase(fetchAsyncGetChoices.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const { selectChoice } = quizSlice.actions;
export const selectSelectedQuiz = (state: RootState) => state.quiz.selectedQuiz;
export const selectSelectedChoice = (state: RootState) =>
  state.quiz.selectedChoice;
export const selectQuizzes = (state: RootState) => state.quiz.quizzes;
export const selectChoices = (state: RootState) => state.quiz.choices;
export default quizSlice.reducer;