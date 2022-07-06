import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { READ_CHOICE, QUIZ, QUIZ_STATE } from "../types";

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
    selectChoice(state, action: PayloadAction<READ_CHOICE>) {
      state.selectedChoice = action.payload;
    },
  },
});

export const { selectChoice } = quizSlice.actions;
export default quizSlice.reducer;
