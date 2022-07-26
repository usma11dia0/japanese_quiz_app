/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

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
import { READ_CHOICE } from "../../../types/features";
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
  const [countIsCorrect, setCountIsCorrect] = useState<number>(0);
  const { playAudio } = useAudio();
  const { targetChoices, targetAnswer, prepareQuiz } = usePrepareQuiz();

  const NumberOfQuestion = 5;

  // 外部APIよりChoiceデータ読込(初回のみ)
  useLayoutEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
    setCountIsCorrect(0);
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

  // 初回読み込み時に音声を一度だけ再生 (最初の問のみ音声が重複してしまう)
  // useLayoutEffect(() => {
  //   if (choices[0].quiz !== "" && document.readyState === "complete") {
  //     playAudio(
  //       selectedAnswerChoice ? selectedAnswerChoice.audio_choice_src : ""
  //     );
  //   }
  // }, [selectedAnswerChoice]);

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
              // console.log(e.target.currentSrc);
              // console.log(selectedAnswerChoice?.image_choice_src);
              setIsCorrect(true);
              setCountIsCorrect(countIsCorrect + 1);
              dispatch(addIsCorrect(selectedAnswerChoice));
              playAudio("../../../../assets/audio/seikai_1.mp3", 0.1);
            } else {
              // alert("不正解です");
              // console.log(e.target.currentSrc);
              // console.log(selectedAnswerChoice?.image_choice_src);
              setIsCorrect(false);
              playAudio("../../../../assets/audio/huseikai_2.mp3", 0.1);
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
            setCountIsCorrect(countIsCorrect + 1);
            dispatch(addIsCorrect(selectedAnswerChoice));
            playAudio("../../../../assets/audio/seikai_1.mp3");
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

  if (isloading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2.5}>
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
      <ScoreBoard>
        {countIsCorrect} / {NumberOfQuestion}{" "}
      </ScoreBoard>
    </>
  );
};
