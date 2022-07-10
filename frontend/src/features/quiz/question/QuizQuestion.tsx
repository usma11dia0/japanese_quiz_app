import { Typography, Grid } from "@mui/material";

import { ChoiceCard } from "../../../components/card/ChoiceCard";

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
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <ChoiceCard customSx={{ mt: 5 }}> ダイゴさん(人名) </ChoiceCard>
        </Grid>
        <Grid item xs={6}>
          <ChoiceCard customSx={{ mt: 5 }}>サンプル</ChoiceCard>
        </Grid>
      </Grid>
    </>
  );
};
