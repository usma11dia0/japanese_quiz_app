import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { TState } from "../features/types";
import { useAxios } from "../hooks/useAxios";
import { selectAmoutOfQuestion } from "../redux/reducer";

export const Questions = () => {
  const amount_of_question = useSelector(selectAmoutOfQuestion);
  console.log(amount_of_question);

  let apiUrl = `/api.php?amount=10`;

  const { response, loading } = useAxios({ url: apiUrl });
  // console.log(response);

  return (
    <Box>
      <Typography variant="h4">Question 1</Typography>
      <Typography mt={5}>This is the question?</Typography>
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
