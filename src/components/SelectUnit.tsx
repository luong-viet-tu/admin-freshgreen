import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { UnitType } from "../types/unitType";

export interface SelectUnitProps {
  errText: string;
  data: Array<UnitType>;
  onChange: (e: string) => void;
  value: string;
}

export default function SelectUnit(props: SelectUnitProps) {
  const id = React.useId();

  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id={id}>Unit</InputLabel>
        <Select
          labelId={id}
          id={id}
          defaultValue={props.value !== "" ? props.value : props.data[0].name}
          label={"Unit"}
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
