/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const [choice, setChoice] = useState<READ_CHOICE>();
  const isloading = useSelector(selectIsLoading);
  const { playAudio } = useAudio();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  // 外部APIよりChoiceデータ読込(初回のみ)
  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  console.log(choices);

  // 読み込んだChoiceデータを一つずつ抽出(choiceIndexのstate変更時に都度実行)
  useEffect(() => {
    if (choices[0].quiz !== "") {
      const selectChoice = choices[choiceIndex];
      setChoice(selectChoice);
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
    playAudio(choice ? choice.audio_choice_src : "");
  };

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    alert("クリックを検知しました");
    const answer = choice!.choice_alphabet;
    if (e.target instanceof HTMLElement) {
      if (e.target.innerText.toUpperCase() === answer.toUpperCase()) {
        // dispatch(handleScoreChange(score+1));
      }
    }

    if (choiceIndex + 1 < choices.length) {
      setChoiceIndex(choiceIndex + 1);
    } else {
      navigate("/quizzes/result");
    }
  };

  console.log(choice);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={-2}>
        問.{choiceIndex + 1} 正しい{choice ? choice.quiz_question_text : ""}
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
          sx={{ marginTop: "2", fontSize: "40px" }} // marginTop: "5", fontSize: "50px"
        />
      </IconButton>
      <Grid container spacing={15}>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={choice ? choice.image_choice_src : ""}
            onClick={(e) => handleClickAnswer(e)}
          >
            {choice ? choice.choice_text : ""}
          </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={choice ? choice.image_choice_src : ""}
            onClick={handleClickAnswer}
          >
            {choice ? choice.choice_text : ""}
          </ChoiceCard>
        </Grid>
      </Grid>
      {/* <Typography variant="h4" fontWeight="bold" mt={5}> */}
      <ScoreBoard />
      {/* </Typography> */}
    </>
  );
};
