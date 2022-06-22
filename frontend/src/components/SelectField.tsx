import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC, useState } from "react";
import { TSelectField } from "../features/types";

export const SelectField: FC<TSelectField> = (props) => {
  const { label } = props;
  const [value, setValue] = useState("");

  const handleChange = () => {};

  return (
    <Box mt={3} width="100%">
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          <MenuItem>Options1</MenuItem>
          <MenuItem>Options2</MenuItem>
          <MenuItem>Options3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
