import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { QUIZ, TState } from "../features/types";
import { useAxios } from "../hooks/useAxios";
import {
  selectAmoutOfQuestion,
  selectQuestionCategory,
  selectQuestionDifficulty,
  selectQuestionType,
} from "../redux/reducer";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const Questions = () => {
  const question_category = useSelector(selectQuestionCategory);
  const question_difficulty = useSelector(selectQuestionDifficulty);
  const question_type = useSelector(selectQuestionType);
  const amount_of_question = useSelector(selectAmoutOfQuestion);

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl }) as {
    response: QUIZ;
    loading: boolean;
  };
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [options, setOptions] = useState<Array<string>>([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
    }
  }, [response]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4">Questions {questionIndex + 1} </Typography>
      <Typography mt={5}>
        {response!.results[questionIndex].question}
      </Typography>
      <Box mt={2}>
        <Button variant="contained">Answer 1</Button>
      </Box>
      <Box mt={2}>
        <Button variant="contained">Answer 2</Button>
      </Box>
      <Box mt={5}>
        <Button>Score 2 / 6</Button>
      </Box>
    </Box>
  );
};
