import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../../app/store";
import {
  READ_CHOICE,
  READ_QUIZ,
  QUIZ_STATE,
  SELECT_CARD,
} from "../../types/features";

export const fetchAsyncGetQuizzes = createAsyncThunk(
  "quiz/getQuizzes",
  async () => {
    const res = await axios.get<READ_QUIZ[]>(
      `${process.env.REACT_APP_API_URL}/api/quizzes/`,
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
      is_correct: false,
    },
  ],
  selectedQuestionChoices: [
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
  selectedAnswerChoice: {
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
  selectedCard: {
    right: false,
    left: false,
  },
  isloading: true,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    selectQuestionChoices(state, action: PayloadAction<READ_CHOICE[]>) {
      state.selectedQuestionChoices = action.payload;
    },
    selectAnswerChoice(state, action: PayloadAction<READ_CHOICE>) {
      state.selectedAnswerChoice = action.payload;
    },
    selectCard(state, action: PayloadAction<SELECT_CARD>) {
      state.selectedCard = action.payload;
    },
    addIsCorrect(state, action: PayloadAction<READ_CHOICE>) {
      state.choices.map((choice: READ_CHOICE) =>
        choice.choice_alphabet === action.payload.choice_alphabet
          ? (choice.is_correct = true)
          : (choice.is_correct = false)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncGetQuizzes.fulfilled,
      (state, action: PayloadAction<READ_QUIZ[]>) => {
        return {
          ...state,
          quizzes: action.payload,
          isloading: false,
        };
      }
    );
    builder.addCase(fetchAsyncGetQuizzes.rejected, () => {
      window.location.href = "/";
    });
    // builder.addCase(
    //   fetchAsyncGetChoices.fulfilled,
    //   (state, action: PayloadAction<READ_CHOICE[]>) => {
    //     let copyActionPayload: READ_CHOICE[] = [...action.payload];
    //     for (let i = copyActionPayload.length - 1; 0 < i; i--) {
    //       let r = Math.floor(Math.random() * (i + 1));
    //       var tmp = copyActionPayload[i];
    //       copyActionPayload[i] = copyActionPayload[r];
    //       copyActionPayload[r] = tmp;
    //     }
    //     return {
    //       ...state,
    //       choices: copyActionPayload,
    //       isloading: false,
    //     };
    //   }
    // );
    builder.addCase(
      fetchAsyncGetChoices.fulfilled,
      (state, action: PayloadAction<READ_CHOICE[]>) => {
        for (let i = action.payload.length - 1; 0 < i; i--) {
          let r = Math.floor(Math.random() * (i + 1));
          var tmp = action.payload[i];
          action.payload[i] = action.payload[r];
          action.payload[r] = tmp;
        }
        return {
          ...state,
          choices: action.payload,
          isloading: false,
        };
      }
    );
    builder.addCase(fetchAsyncGetChoices.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const {
  selectQuestionChoices,
  selectAnswerChoice,
  selectCard,
  addIsCorrect,
} = quizSlice.actions;
export const selectChoices = (state: RootState) => state.quiz.choices;
export const selectSelectedQuestionChoices = (state: RootState) =>
  state.quiz.selectedQuestionChoices;
export const selectSelectedAnswerChoice = (state: RootState) =>
  state.quiz.selectedAnswerChoice;
export const selectSelectedCard = (state: RootState) => state.quiz.selectedCard;
export const selectIsLoading = (state: RootState) => state.quiz.isloading;

export default quizSlice.reducer;
