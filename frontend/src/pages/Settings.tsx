import React, { FormEvent } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { SelectField } from "../components/SelectField";
import { TextFieldComp } from "../components/TextFieldComp";
import { useAxios } from "../hooks/useAxios";
import { CATEGORY, DIFFICULTY, TYPE } from "../features/types";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { response, error, loading } = useAxios({
    url: "/api_category.php",
  }) as { response: CATEGORY; error: string; loading: boolean };
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        some Went Wrong
      </Typography>
    );
  }

  const difficultyOptions: DIFFICULTY[] = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions: TYPE[] = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <>
      <Typography variant="h2" fontWeight="bold" mt={5}>
        Quiz App
      </Typography>
      <form onSubmit={handleSubmit}>
        <SelectField
          options={response ? response.trivia_categories : undefined}
          label="Category"
        />
        <SelectField options={difficultyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <TextFieldComp />
        <Box mt={3} width="100%">
          <Button fullWidth variant="contained" type="submit">
            Get Started
          </Button>
        </Box>
      </form>
    </>
  );
};
