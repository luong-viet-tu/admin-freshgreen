import { Avatar, Box, Divider, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { selectUser, setPopup } from "../../../../redux/slices/messageSlice";
import { mainColor } from "../../../../resources/color";
import { RootState } from "../../../../redux/store";
import { MessageItemType } from "../../../../types/messageType";
import { fullnameOfUser } from "../../../../types/userType";
import moment from "moment";
import { messageActions } from "../../../../actions/messageAction";
import { useEffect } from "react";
import { socket } from "../../../../utils/socketConfirm";

const ListItem = (data: MessageItemType) => {
  const dispatch = useAppDispatch();
  const seen = true;
  const user = useAppSelector((state: RootState) => state.user.user);

  const handleSelect = () => {
    dispatch(selectUser(data));
    dispatch(messageActions.get({ from: user._id!, to: data.userId }));
  };

  useEffect(() => {
    user &&
      socket.on("message-recieve", (data) => {
        dispatch(
          messageActions.get({
            from: user._id!,
            to: user._id! !== data.from ? data.to : data.from,
          })
        );
        dispatch(setPopup(true));
        dispatch(
          selectUser({
            userId: data.userId,
            fullname: data.fullname,
            avatar: data.avatar,
          })
        );
      });
  }, [dispatch, user]);

  return (
    <Box sx={{ cursor: "pointer" }} onClick={handleSelect}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          paddingTop: 2,
          pr: 2,
        }}
      >
        <Avatar src={data.avatar} alt="avatar" />
        <Box width={"100%"}>
          <Box
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>
              {fullnameOfUser(data.fullname).length > 10
                ? fullnameOfUser(data.fullname).slice(0, 10) + "..."
                : fullnameOfUser(data.fullname)}
            </Typography>
            {seen && <Box component={"li"} sx={{ color: mainColor }}></Box>}
            <Typography
              fontWeight={600}
              color={"#777"}
              fontSize={13}
              fontStyle={"italic"}
            >
              {moment(data.createdAt).format("LT")}
            </Typography>
          </Box>
          <Typography fontSize={14} color={"#555"}>
            {data.lastMessage?.text!.length > 16
              ? data.lastMessage.text!.slice(0, 16) + "..."
              : data.lastMessage.text}
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ pt: 1 }} />
    </Box>
  );
};

function List() {
  const messages = useAppSelector(
    (state: RootState) => state.messages.messages
  );

  const user = useAppSelector((state: RootState) => state.user.user);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <ListIcon />
        <Typography fontWeight={600}>Danh sách</Typography>
      </Box>
      <Box sx={{ overflowY: "auto", height: "90%" }}>
        {messages.map(
          (d, i) => d.username !== user.username && <ListItem {...d} key={i} />
        )}
      </Box>
    </Box>
  );
}

export default List;
