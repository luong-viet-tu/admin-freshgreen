import { Box, Button, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography fontWeight={600} fontSize={50} align="center" mt={30}>
        Opps... Page not Found
      </Typography>

      <Button href={"/"} sx={{ m: "0 auto" }}>
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;
