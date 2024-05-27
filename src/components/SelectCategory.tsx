import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CategoryType } from "../types/categoryType";

export interface SelectCategoryProps {
  errText: string;
  data: Array<CategoryType>;
  onChange: (e: string) => void;
  value: string;
}

export default function SelectCategoryNews(props: SelectCategoryProps) {
  const id = React.useId();

  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Category</InputLabel>
        <Select
          labelId={id}
          id={id}
          value={props.value !== "" ? props.value : props.data[0].name}
          label={"Category"}
          onChange={(e) => props.onChange(e.target.value)}
          error={props.errText !== ""}
        >
          {props.data.map((data, index) => (
            <MenuItem key={index} value={data.name}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
