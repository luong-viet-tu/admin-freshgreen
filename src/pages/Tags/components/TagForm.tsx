import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { memo } from "react";

interface TagProps {
  tag: string;
  setTag: (tag: string) => void;
  onChange: () => void;
  tagErrText: string;
  isLoading: boolean;
}

const TagForm = memo((props: TagProps) => {
  return (
    <Box width={"20%"} display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Create a Tag
      </Typography>
      <Box>
        <TextField
          fullWidth
          placeholder="Create new..."
          name="tag"
          label="Tag"
          value={props.tag}
          onChange={(e) => props.setTag(e.target.value)}
          error={props.tagErrText !== ""}
          type="text"
          helperText={props.tagErrText}
        />
        <LoadingButton
          variant="contained"
          onClick={props.onChange}
          fullWidth
          loading={props.isLoading}
          sx={{ mt: 3 }}
        >
          Create
        </LoadingButton>
      </Box>
    </Box>
  );
});

export default TagForm;
