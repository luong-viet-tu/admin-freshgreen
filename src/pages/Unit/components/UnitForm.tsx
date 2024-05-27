import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { memo } from "react";

interface TagProps {
  unit: string;
  setUnit: (unit: string) => void;
  onChange: () => void;
  tagErrText: string;
  isLoading: boolean;
}

const UnitForm = memo((props: TagProps) => {
  return (
    <Box width={"20%"} display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Create a Unit
      </Typography>
      <Box>
        <TextField
          fullWidth
          placeholder="Create new..."
          name="unit"
          label="Unit"
          value={props.unit}
          onChange={(e) => props.setUnit(e.target.value)}
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

export default UnitForm;
