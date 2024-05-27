import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { ShopType } from "../../../types/shopType";
import { notImage } from "../../../resources/images";
import moment from "moment";

const ShopItem = memo(({ shop }: { shop: ShopType }) => {
  const handleView = () => {
    console.log("viewing");
  };

  return (
    <Box>
      <Card
        sx={{
          width: 200,
          height: 300,
        }}
      >
        <CardActionArea onClick={handleView}>
          <CardMedia
            component={"img"}
            image={shop.image ?? notImage}
            sx={{ width: "100%", height: 150, objectFit: "cover" }}
          />
          <Typography>
            <i> Created: {moment(shop.createdAt).format("l")}</i>
          </Typography>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
              m: 1,
              p: 1,
            }}
          >
            <Avatar
              src={typeof shop?.user === "string" ? "" : shop.user?.avatar}
              alt={"avatar"}
            />
            <Typography fontWeight={600}>
              {typeof shop?.user === "string"
                ? ""
                : shop.user?.fullname.firstname + " " + typeof shop?.user ===
                  "string"
                ? ""
                : shop.user?.fullname.lastname}
            </Typography>
          </Paper>

          <Typography fontWeight={600} fontSize={22} align="center">
            {shop.name}
          </Typography>
        </CardActionArea>
      </Card>
    </Box>
  );
});

export default ShopItem;
