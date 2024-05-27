import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Skeleton,
} from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box>
      <Card sx={{ width: 300, height: 500 }}>
        <Skeleton variant="rectangular" height={40} />
        <CardContent>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="40%" height={20} />
        </CardContent>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" width="70%" height={30} />
          <Skeleton variant="text" width="40%" height={25} />
          <Skeleton variant="text" width="40%" height={25} />
        </CardContent>
        <CardActionArea
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="rounded" width={40} height={40} />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ProductCardSkeleton;
