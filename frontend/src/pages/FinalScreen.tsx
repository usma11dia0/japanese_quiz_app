import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectScore } from "../redux/reducer";
import { useNavigate } from "react-router-dom";
import { handleAmountChange, handleScoreChange } from "../redux/actions";

export const FinalScreen = () => {
  const { score } = useSelector(selectScore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate("/");
  };

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score {score}
      </Typography>
      <Button onClick={handleBackToSettings} variant="outlined">
        back to settings!
      </Button>
    </Box>
  );
};
