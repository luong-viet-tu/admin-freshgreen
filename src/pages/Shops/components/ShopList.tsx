import { Box, LinearProgress, Typography } from "@mui/material";
import NewsItem from "./ShopItem";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { memo } from "react";
import { ShopType } from "../../../types/shopType";

const ShopList = memo(({ shops }: { shops: ShopType[] }) => {
  const loading = useAppSelector((state: RootState) => state.shop.loading);

  return loading ? (
    <LinearProgress />
  ) : !shops.length ? (
    <Typography fontSize={23} fontWeight={600} align="center">
      There are no shop yet!
    </Typography>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        px: 3,
        pt: 5,
      }}
    >
      {shops.map((shop: ShopType) => (
        <NewsItem key={shop._id} shop={shop} />
      ))}
    </Box>
  );
});

export default ShopList;
