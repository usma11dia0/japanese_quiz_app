import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useNavigate } from "react-router-dom";

import { QUIZ, TState } from "../features/types";
import { useAxios } from "../hooks/useAxios";
import {
  selectAmoutOfQuestion,
  selectQuestionCategory,
  selectQuestionDifficulty,
  selectQuestionType,
  selectScore,
} from "../redux/reducer";
import { handleScoreChange } from "../redux/actions";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const Questions = () => {
  const question_category = useSelector(selectQuestionCategory);
  const question_difficulty = useSelector(selectQuestionDifficulty);
  const question_type = useSelector(selectQuestionType);
  const amount_of_question = useSelector(selectAmoutOfQuestion);
  const score = useSelector(selectScore);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  console.log(options);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const question = response.results[questionIndex];
    if (e.target instanceof HTMLElement) {
      if (
        e.target.innerText.toUpperCase() ===
        question.correct_answer.toUpperCase()
      ) {
        dispatch(handleScoreChange(score + 1));
      }
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Questions {questionIndex + 1} </Typography>
      <Typography mt={5}>
        {decode(response?.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button onClick={(e) => handleClickAnswer(e)} variant="contained">
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        <Button>
          Score {score} / {response.results.length}
        </Button>
      </Box>
    </Box>
  );
};
