import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { memo } from "react";

interface CategoryProps {
  category: string;
  setCategory: (category: string) => void;
  onChange: () => void;
  categoryErrText: string;
  isLoading: boolean;
}

const CategoryForm = memo((props: CategoryProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Create a category
      </Typography>

      <Box>
        <TextField
          fullWidth
          placeholder="Create new..."
          name="category"
          label="Category"
          value={props.category}
          onChange={(e) => props.setCategory(e.target.value)}
          error={props.categoryErrText !== ""}
          type="text"
          helperText={props.categoryErrText}
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

export default CategoryForm;
