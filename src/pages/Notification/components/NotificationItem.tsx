import { Avatar, Box, Paper, Switch, Typography } from "@mui/material";
import { NotificationType } from "../../../types/notificationType";
import DeleteIcon from "@mui/icons-material/Delete";
import { mainColor } from "../../../resources/color";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../../redux/hooks";
import { notificationsActions } from "../../../actions/notificationsActions";
import { useState } from "react";

export default function NotificationItem(notification: NotificationType) {
  const avatar = () => {
    if (typeof notification.auth === "string" || !notification.auth) return "";

    if (notification.auth.avatar) {
      return notification.auth.avatar;
    }

    return "";
  };

  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(notification.status);

  const handleDelete = () => {
    dispatch(notificationsActions.delete(notification._id!));
  };

  const handleChangeStatus = () => {
    const updatedStatus = !checked;
    setChecked(updatedStatus);
    dispatch(
      notificationsActions.update({ id: notification._id!, status: checked })
    );
  };

  return (
    <Box mb={3}>
      <Typography sx={{ fontStyle: "italic", fontSize: 13 }}>
        {notification.createdAt}
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Paper
          elevation={5}
          sx={{
            padding: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
            width: 300,
          }}
        >
          <Avatar src={avatar()} alt="avatar" />
          <Box>
            <Typography fontWeight={600} fontSize={18}>
              {notification.title}
            </Typography>
            <Typography>{notification.description}</Typography>
          </Box>
        </Paper>

        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Switch
            color={"success"}
            checked={checked}
            onChange={handleChangeStatus}
          />
          <LoadingButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </LoadingButton>
        </Box>
      </Box>
      <Typography fontWeight={600} color={mainColor} fontStyle={"italic"}>
        path: {notification.path || "undefined"}
      </Typography>
    </Box>
  );
}
