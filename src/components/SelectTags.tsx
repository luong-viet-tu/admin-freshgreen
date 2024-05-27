import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { TagType } from "../types/tagType";

export interface SelectTagsNewsProps {
  tagsData: TagType[];
  tagSelected: string[];
  handleSelectTags: (tag: string) => void;
  error: string;
}

export default function SelectTagsNews(props: SelectTagsNewsProps) {
  const id = React.useId();
  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 250, maxWidth: 500 }}>
        <InputLabel id={id}>Tag</InputLabel>
        <Select
          labelId={id}
          multiple
          value={props.tagSelected}
          onChange={(event: any) => props.handleSelectTags(event.target.value)}
          input={<OutlinedInput label={props.tagsData[0].name} />}
          renderValue={(selected) => selected.join(", ")}
          error={props.error !== ""}
        >
          {props.tagsData.map((tag, index) => (
            <MenuItem key={index} value={tag.name}>
              <Checkbox checked={props.tagSelected.indexOf(tag.name) > -1} />
              <ListItemText primary={tag.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
