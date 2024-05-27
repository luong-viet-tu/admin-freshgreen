import { Box } from "@mui/material";
import List from "./components/List";
import Chat from "./components/Chat";

function MainChat() {
  return (
    <Box
      sx={{
        display: "flex",
        width: 700,
        height: 500,
        bottom: 0,
        padding: 2,
      }}
    >
      <Box width={"35%"}>
        <List />
      </Box>
      <Box width={"65%"}>
        <Chat />
      </Box>
    </Box>
  );
}

export default MainChat;
