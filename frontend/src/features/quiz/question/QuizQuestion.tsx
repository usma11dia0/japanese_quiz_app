import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { ChoiceCard } from "../../../components/card/ChoiceCard";
import styles from "./QuizQuestion.module.css";
import { fetchAsyncGetChoices, selectChoices } from "../quizSlice";
import { AppDispatch } from "../../../app/store";

export const QuizQuestion = () => {
  const dispatch: AppDispatch = useDispatch();
  const choices = useSelector(selectChoices);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetChoices());
    };
    fetchBootLoader();
  }, [dispatch]);

  console.log(choices);
  const onClickAudio = () => {};
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={1}>
        問.1 正しい{choices[0] ? choices[0].quiz_question_text : ""}
        を選択してください。
      </Typography>
      <VolumeUpIcon
        color="primary"
        className={styles.volumeUpIcon}
        onClick={onClickAudio}
        sx={{ fontSize: "50px" }}
      />
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
