import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, TextField, Switch } from "@mui/material";
import { NotificationType } from "../../../types/notificationType";
import { FormEvent, memo, useState } from "react";
import { UserType } from "../../../types/userType";

interface Props {
  onSubmit: (data: NotificationType) => void;
  user: UserType;
  isLoading: boolean;
}

export const Form = memo((props: Props) => {
  const { user, onSubmit, isLoading } = props;
  const [status, setStatus] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: NotificationType = {
      auth: user._id!,
      title: formData.get("title")?.toString()!,
      description: formData.get("description")?.toString()!,
      path: formData.get("path")?.toString()!,
      status,
    };
    onSubmit(data);
  };

  return (
    <Paper elevation={5} sx={{ padding: 3, width: 300 }}>
      <Typography fontSize={22} fontWeight={600} textAlign={"center"}>
        Create notification
      </Typography>
      <Box
        onSubmit={handleSubmit}
        component={"form"}
        sx={{ display: "flex", flexDirection: "column", gap: 3, py: 5 }}
      >
        <TextField
          label="Title"
          name="title"
          placeholder="Enter title"
          required
        />
        <TextField
          multiline={true}
          required
          name="description"
          placeholder="Enter description"
          label={"Description"}
        />
        <TextField
          name="path"
          label="Path [option]"
          placeholder="Enter path "
        />

        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Typography>Show</Typography>
          <Switch color={"success"} onChange={() => setStatus(!status)} />
        </Box>

        <LoadingButton
          color="success"
          variant="contained"
          type="submit"
          loading={isLoading}
          sx={{ fontWeight: 600, color: "white" }}
        >
          Create
        </LoadingButton>
      </Box>
    </Paper>
  );
});
