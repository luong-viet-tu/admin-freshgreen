import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { memo } from "react";

interface RoleProps {
  role: string;
  setRole: (role: string) => void;
  onChange: () => void;
  roleErrText: string;
  isLoading: boolean;
}

const RoleForm = memo((props: RoleProps) => {
  return (
    <Box width={"20%"} display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Create a Role
      </Typography>
      <Box>
        <TextField
          fullWidth
          placeholder="Create new..."
          name="role"
          label="Role"
          value={props.role}
          onChange={(e) => props.setRole(e.target.value)}
          error={props.roleErrText !== ""}
          type="text"
          helperText={props.roleErrText}
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

export default RoleForm;
