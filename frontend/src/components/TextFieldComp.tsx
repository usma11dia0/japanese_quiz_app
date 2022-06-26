import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../app/store";
import { handleAmountChange } from "../redux/actions";

export const TextFieldComp = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleAmountChange(parseInt(e.target.value)));
  };

  return (
    <Box mt={3} width="100%">
      <FormControl fullWidth size="small">
        <TextField
          onChange={handleChange}
          variant="outlined"
          label="Amount of Questions"
          type="number"
          size="small"
        ></TextField>
      </FormControl>
    </Box>
  );
};
