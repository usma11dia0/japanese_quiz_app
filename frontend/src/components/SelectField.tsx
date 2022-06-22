import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { TSelectField } from "../features/types";

export const SelectField = (props: TSelectField) => {
  const { label, options } = props;
  const [value, setValue] = useState("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
  };

  return (
    <Box mt={3} width="100%">
      <FormControl size="small" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options
            ? options.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))
            : undefined}
        </Select>
      </FormControl>
    </Box>
  );
};
