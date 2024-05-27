import { Box, Divider, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { messageActions } from "../../../../actions/messageAction";
import MessageItem from "./MessageItem";
import { fullnameOfUser } from "../../../../types/userType";
import { NotificationToast } from "../../../../utils/handlers/NotificationToast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector((state: RootState) => state.user.user);
  const {
    message: data,
    userChat,
    loading,
  } = useAppSelector((state: RootState) => state.messages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const chatContainer = messagesEndRef.current;
    if (chatContainer) {
      const isUserAtBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;

      if (isUserAtBottom) {
        chatContainer.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [userChat]);

  const handleSend = () => {
    if (user.username !== "luongviettu")
      return NotificationToast({
        message: "access denied",
        type: "error",
      });
    setMessage("");
    dispatch(
      messageActions.send({
        from: user?._id!,
        to: data?.userId!,
        message: {
          text: message,
        },
      })
    );
  };

  return (
    <Box pl={2} display={"flex"} flexDirection={"column"} height={"100%"}>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          <Typography>to: </Typography>
          {data?.fullname && (
            <Typography fontWeight={600}>
              {fullnameOfUser(data?.fullname!)}
            </Typography>
          )}
        </Box>
        <Divider variant="middle" />
      </Box>

      <Box sx={{ flex: 1, padding: 3, height: 100, overflow: "auto" }}>
        {userChat.map((chat, index) => (
          <MessageItem
            key={index}
            {...chat}
            fromSelf={chat.fromSelf}
            reveicer={data!}
            user={user!}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ mt: "auto", width: "100%", display: "flex" }}>
        <TextField
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          value={message}
          label="Đặt câu hỏi..."
          variant="filled"
        />
        <LoadingButton onClick={handleSend} loading={loading}>
          <SendIcon />
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Chat;
