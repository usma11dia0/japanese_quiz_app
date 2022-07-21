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
import { useTheme } from "@mui/material/styles";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import DummySound from "./correct_audio.mp3";

import { ChoiceCard } from "../../../components/card/ChoiceCard";
import styles from "./QuizQuestion.module.css";
import {
  fetchAsyncGetChoices,
  selectChoices,
  selectIsLoading,
} from "../quizSlice";
import { AppDispatch } from "../../../app/store";
import { useAudio } from "../../../hooks/useAudio";
import { READ_CHOICE } from "../../../types/features";
import { useNavigate } from "react-router-dom";
import { ScoreBoard } from "../../../components/scoreboard/ScoreBoard";

export const QuizQuestion = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const choices = useSelector(selectChoices);
  const [choiceIndex, setChoiceIndex] = useState<number>(0);
  const [questionChoices, setQuestionChoices] = useState<READ_CHOICE[]>();
  const [answerChoice, setAnswerChoice] = useState<READ_CHOICE>();
  const [isCorrect, setIsCorrect] = useState(false);
  const isloading = useSelector(selectIsLoading);
  const { playAudio } = useAudio();

  const theme = useTheme();

  // 外部APIよりChoiceデータ読込(初回のみ)
  useLayoutEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  //乱数作成関数
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // 読み込んだChoiceデータを一つずつ抽出(choiceIndexのstate変更時に都度実行)
  useEffect(() => {
    if (choices[0].quiz !== "") {
      const answerChoice = choices[choiceIndex];
      let targetChoices = [answerChoice];

      //answerChoiceと同じ発音の同音異義語を抽出
      for (const choice of choices) {
        if (
          choice["quiz_question_text"] === answerChoice["quiz_question_text"] &&
          choice["choice_alphabet"] !== answerChoice["choice_alphabet"]
        )
          targetChoices.splice(getRandomInt(targetChoices.length), 0, choice);
      }
      setAnswerChoice(answerChoice);
      setQuestionChoices(targetChoices);
    }
  }, [choices, choiceIndex]);

  if (isloading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAudio = () => {
    playAudio(answerChoice ? answerChoice.audio_choice_src : "");
  };

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = answerChoice!.choice_text;

    if (e.target instanceof HTMLElement) {
      switch (e.target.innerText) {
        case "":
          if (e.target instanceof HTMLImageElement) {
            if (e.target.currentSrc === answerChoice?.image_choice_src) {
              setIsCorrect(true);
              alert("正解です");
              console.log(e.target.currentSrc);
              console.log(answerChoice?.image_choice_src);
            } else {
              setIsCorrect(false);
              alert("不正解です");
              console.log(e.target.currentSrc);
              console.log(answerChoice?.image_choice_src);
            }
          }
          break;
        default:
          if (
            e.target.innerText.toUpperCase() ===
            answerChoice?.choice_text.toUpperCase()
          ) {
            setIsCorrect(true);
            alert("正解です");
            console.log(e.target.innerText);
            console.log(answerChoice?.choice_text);
          } else {
            setIsCorrect(false);
            alert("不正解です");
            console.log(e.target.innerText);
            console.log(answerChoice?.choice_text);
          }
          break;
      }

      document
        .querySelector(".ChoiceCard_card__6lcet")
        ?.classList.add("clicked");

      if (choiceIndex + 1 < choices.length) {
        setTimeout(() => {
          setChoiceIndex(choiceIndex + 1);
        }, 3000);
      } else {
        navigate("/quizzes/result");
      }
    }
  };

  console.log(choices);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2}>
        問.{choiceIndex + 1} 正しい
        {answerChoice ? answerChoice.quiz_question_text : ""}
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
            imgSrc={questionChoices ? questionChoices[0].image_choice_src : ""}
            isCorrect={isCorrect}
            onClick={(e) => handleClickAnswer(e)}
          >
            {questionChoices ? questionChoices[0].choice_text : ""}
          </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={questionChoices ? questionChoices[1].image_choice_src : ""}
            isCorrect={isCorrect}
            onClick={(e) => handleClickAnswer(e)}
          >
            {questionChoices ? questionChoices[1].choice_text : ""}
          </ChoiceCard>
        </Grid>
      </Grid>
      {/* <Typography variant="h4" fontWeight="bold" mt={5}> */}
      <ScoreBoard />
      {/* </Typography> */}
    </>
  );
};
