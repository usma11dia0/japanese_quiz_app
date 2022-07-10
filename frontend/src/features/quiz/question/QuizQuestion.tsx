import { Typography, Grid } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { ChoiceCard } from "../../../components/card/ChoiceCard";
import styles from "./QuizQuestion.module.css";

// import {
//   fetchAsyncGetQuizzes,
//   fetchAsyncGetChoices,
//   selectQuizzes,
//   selectChoices,
// } from "../../quiz/quizSlice";

export const QuizQuestion = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mt={4}>
        問.1 ダイゴさん(人名)を選択してください。
      </Typography>
      <VolumeUpIcon
        color="primary"
        className={styles.volumeUpIcon}
        sx={{ fontSize: "70px" }}
      />
      <Grid container spacing={10}>
        <Grid item xs={6}>
          <ChoiceCard customSx={{ mt: 5 }}> ダイゴさん(人名) </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard customSx={{ mt: 5 }}>大誤解</ChoiceCard>
        </Grid>
      </Grid>
    </>
  );
};
