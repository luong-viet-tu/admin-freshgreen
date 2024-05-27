import { Box } from "@mui/material";
import List from "./components/List";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { notificationsActions } from "../../actions/notificationsActions";
import { NotificationType } from "../../types/notificationType";
import { Form } from "./components/Form";
import { socket } from "../../utils/socketConfirm";

function Notifications() {
  const { notifications, loading } = useAppSelector(
    (state: RootState) => state.notifications
  );
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (data: NotificationType) => {
    dispatch(notificationsActions.create(data)).then(() => {
      socket.emit("create-notification", data);
    });
  };

  useEffect(() => {
    dispatch(notificationsActions.gets());
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Form user={user} onSubmit={handleSubmit} isLoading={loading} />
      <List notifications={notifications} />
    </Box>
  );
}

export default Notifications;
