import { memo, useState } from "react";
import { Box } from "@mui/system";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../app/store";
import { TSelectField } from "../types/types";
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
} from "../redux/actions";

export const SelectField = memo((props: TSelectField) => {
  const { label, options } = props;
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }
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
});
