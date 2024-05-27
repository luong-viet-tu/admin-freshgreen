import { Box, SpeedDial } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import MainChat from "./MainChat";
import ZoomInFromBottomRight from "./ZoomInFromBottomRight ";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setPopup } from "../../redux/slices/messageSlice";
import { mainColor } from "../../resources/color";

const PopupMessage = () => {
  const popup = useAppSelector((state: RootState) => state.messages.popup);
  const dispatch = useDispatch();

  const toggleMainChat = () => {
    dispatch(setPopup(!popup));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        gap: 3,
        zIndex: 1000,
      }}
    >
      <ZoomInFromBottomRight isOpen={popup}>
        <MainChat />
      </ZoomInFromBottomRight>
      <SpeedDial
        ariaLabel="Popup message"
        color="red"
        sx={{}}
        icon={<MessageIcon />}
        FabProps={{
          sx: {
            bgcolor: mainColor,
          },
        }}
        onClick={toggleMainChat}
      ></SpeedDial>
    </Box>
  );
};

export default PopupMessage;
