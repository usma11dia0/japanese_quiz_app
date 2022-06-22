import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";

export const TextFieldComp = () => {
  const handleChange = () => {};

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
