import { Avatar, Box, Link, Typography, createStyles } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  UserType,
  addressOfUser,
  fullnameOfUser,
} from "../../../types/userType";
import { memo } from "react";
import { clientURL } from "../../../utils/api/axiosClient";

const userInforItem = createStyles({
  display: "flex",
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
});

const UserInfo = memo((user: UserType) => {
  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 2 }}>
      <Avatar
        src={user?.avatar}
        alt={user?.username}
        style={{
          width: 80,
          height: 80,
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box width={"80%"}>
        <Box sx={userInforItem}>
          <PersonIcon color="success" />
          <Link
            fontWeight={600}
            sx={{ cursor: "pointer" }}
            href={`${clientURL}/tai-khoan/${user._id}`}
          >
            {fullnameOfUser(user.fullname)}
          </Link>
        </Box>
        <Box sx={userInforItem}>
          <PhoneIcon color="success" />
          <Typography fontWeight={600}>{user.phone}</Typography>
        </Box>
        <Box sx={userInforItem}>
          <EmailIcon color="success" />
          <Typography fontWeight={600}>{user.email}</Typography>
        </Box>
        <Box sx={userInforItem}>
          <LocationOnIcon color="success" />
          <Typography sx={{ wordWrap: "break-word" }} fontWeight={600}>
            {addressOfUser(user.address)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

export default UserInfo;
