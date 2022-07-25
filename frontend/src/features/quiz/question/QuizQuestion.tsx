/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import DummySound from "./correct_audio.mp3";

import { ChoiceCard } from "../../../components/card/ChoiceCard";
import styles from "./QuizQuestion.module.css";
import {
  initialState,
  selectCard,
  fetchAsyncGetChoices,
  selectChoices,
  addIsCorrect,
  selectSelectedQuestionChoices,
  selectSelectedAnswerChoice,
  selectSelectedCard,
  selectIsLoading,
  selectQuestionChoices,
  selectAnswerChoice,
} from "../quizSlice";
import { AppDispatch } from "../../../app/store";
import { useAudio } from "../../../hooks/useAudio";
import { usePrepareQuiz } from "../../../hooks/usePrepareQuiz";
import { READ_CHOICE, SELECT_CARD } from "../../../types/features";
import { useNavigate } from "react-router-dom";
import { ScoreBoard } from "../../../components/scoreboard/ScoreBoard";

export const QuizQuestion = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const choices: READ_CHOICE[] = useSelector(selectChoices);
  const selectedQuestionChoices = useSelector(selectSelectedQuestionChoices);
  const selectedAnswerChoice = useSelector(selectSelectedAnswerChoice);
  const selectedCard = useSelector(selectSelectedCard);
  const isloading = useSelector(selectIsLoading);
  const [choiceIndex, setChoiceIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const { playAudio } = useAudio();
  const { targetChoices, targetAnswer, prepareQuiz } = usePrepareQuiz();

  const NumberOfQuestion = 5;

  // 外部APIよりChoiceデータ読込(初回のみ)
  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  // 読み込んだChoicesデータを一つずつ抽出(choiceIndexのstate変更時に都度実行)
  useLayoutEffect(() => {
    dispatch(selectCard(initialState.selectedCard));
    setIsCorrect(undefined);
    prepareQuiz(choices, choiceIndex);
    dispatch(
      selectQuestionChoices(
        targetChoices ? targetChoices : initialState.selectedQuestionChoices
      )
    );
    dispatch(
      selectAnswerChoice(
        targetAnswer ? targetAnswer : initialState.selectedAnswerChoice
      )
    );
  }, [choices[0].quiz, choiceIndex, targetAnswer]);

  if (isloading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAudio = () => {
    playAudio(
      selectedAnswerChoice ? selectedAnswerChoice.audio_choice_src : ""
    );
  };

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLElement) {
      switch (e.target.innerText) {
        case "":
          if (e.target instanceof HTMLImageElement) {
            if (
              e.target.currentSrc === selectedAnswerChoice?.image_choice_src
            ) {
              // alert("正解です");
              setIsCorrect(true);
              dispatch(addIsCorrect(selectedAnswerChoice));

              console.log(e.target.currentSrc);
              console.log(selectedAnswerChoice?.image_choice_src);
            } else {
              // alert("不正解です");
              setIsCorrect(false);
              console.log(e.target.currentSrc);
              console.log(selectedAnswerChoice?.image_choice_src);
            }
          }
          break;
        default:
          if (
            e.target.innerText.toUpperCase() ===
            selectedAnswerChoice?.choice_text.toUpperCase()
          ) {
            // alert("正解です");
            setIsCorrect(true);
            dispatch(addIsCorrect(selectedAnswerChoice));
            console.log(e.target.innerText);
            console.log(selectedAnswerChoice?.choice_text);
          } else {
            // alert("不正解です");
            setIsCorrect(false);
            console.log(e.target.innerText);
            console.log(selectedAnswerChoice?.choice_text);
          }
          break;
      }

      if (choiceIndex + 1 < NumberOfQuestion) {
        setTimeout(() => {
          setChoiceIndex(choiceIndex + 1);
        }, 1500);
      } else {
        setTimeout(() => {
          navigate("/quizzes/result");
        }, 1500);
      }
    }
  };

  console.log(choices);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2}>
        問.{choiceIndex + 1} 正しい
        {selectedAnswerChoice ? selectedAnswerChoice.quiz_question_text : ""}
        を選択してください。
      </Typography>
      <IconButton
        aria-label="play volume"
        disableRipple={true}
        onClick={handleClickAudio}
      >
        <VolumeUpIcon
          color="primary"
          className={styles.volumeUpIcon}
          sx={{ marginTop: "2", fontSize: "40px" }}
        />
      </IconButton>
      <Grid container spacing={15}>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={
              selectedQuestionChoices[0].quiz !== ""
                ? selectedQuestionChoices[0].image_choice_src
                : ""
            }
            isCorrect={isCorrect}
            isClicked={selectedCard.right ? true : false}
            onClick={(e) => {
              handleClickAnswer(e);
              dispatch(selectCard({ right: true }));
            }}
          >
            {selectedQuestionChoices[0].quiz !== ""
              ? selectedQuestionChoices[0].choice_text
              : ""}
          </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={
              selectedQuestionChoices[0].quiz !== ""
                ? selectedQuestionChoices[1].image_choice_src
                : ""
            }
            isCorrect={isCorrect}
            isClicked={selectedCard.left ? true : false}
            onClick={(e) => {
              handleClickAnswer(e);
              dispatch(selectCard({ left: true }));
            }}
          >
            {selectedQuestionChoices[0].quiz !== ""
              ? selectedQuestionChoices[1].choice_text
              : ""}
          </ChoiceCard>
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight="bold">
        <ScoreBoard> 4 / 5 </ScoreBoard>
      </Typography>
    </>
  );
};
