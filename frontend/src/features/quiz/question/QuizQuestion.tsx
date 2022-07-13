/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
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
  fetchAsyncGetChoices,
  selectChoices,
  selectIsLoading,
} from "../quizSlice";
import { AppDispatch } from "../../../app/store";
import { useAudio } from "../../../hooks/useAudio";

export const QuizQuestion = () => {
  const dispatch: AppDispatch = useDispatch();
  const choices = useSelector(selectChoices);
  const isloading = useSelector(selectIsLoading);
  const { playAudio } = useAudio();

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, []);

  const onClickAudio = () => {
    playAudio(choices[0].audio_choice_src);
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
      <Typography variant="h5" fontWeight="bold" mt={1}>
        問.1 正しい{choices[0] ? choices[0].quiz_question_text : ""}
        を選択してください。
      </Typography>
      <IconButton
        aria-label="add to volumeup"
        disableRipple={true}
        onClick={onClickAudio}
      >
        <VolumeUpIcon
          color="primary"
          className={styles.volumeUpIcon}
          sx={{ fontSize: "45px" }}
        />
      </IconButton>
      <Grid container spacing={15}>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={choices[0] ? choices[0].image_choice_src : ""}
          >
            {choices[0] ? choices[0].choice_text : ""}
          </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard
            customSx={{ mt: 2 }}
            imgSrc={choices[1] ? choices[1].image_choice_src : ""}
          >
            {choices[1] ? choices[1].choice_text : ""}
          </ChoiceCard>
        </Grid>
      </Grid>
    </>
  );
};
