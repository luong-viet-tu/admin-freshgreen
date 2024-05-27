import { memo, useCallback } from "react";
import { ProductType } from "../../../types/productType";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { formatDateInput } from "../../../utils/handlers/formatDateInput";
import { formattedAmount } from "../../../utils/handlers/formatMoney";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../redux/hooks";
import { productActions } from "../../../actions/productActions";
import EditIcon from "@mui/icons-material/Edit";
import { setProductModal } from "../../../redux/slices/productSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ProductCartItem = memo(({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();

  const handleEdit = useCallback(() => {
    dispatch(setProductModal({ open: true, data: product }));
  }, [dispatch, product]);

  const handleDelete = () => {
    product._id && dispatch(productActions.delete(product._id));
  };

  return (
    <Box>
      <Card sx={{ width: 300, height: 600 }}>
        {/* shop info */}
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            pt: 1,
          }}
        >
          <Avatar
            src={product.shop.user?.avatar}
            alt={product.shop.name}
            sx={{ width: 40, height: 40 }}
          />
          <Typography>{product.shop.name || "Anonymous"}</Typography>
        </CardActionArea>
        <Typography align="center" fontSize={"13"} fontStyle={"italic"}>
          {formatDateInput(product.createdAt)}
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            fontSize={"13"}
            fontStyle={"italic"}
            fontWeight={600}
            color={"red"}
          >
            quantity:{product.currentQuantity}
          </Typography>
          <Typography
            fontSize={"13"}
            fontStyle={"italic"}
            fontWeight={600}
            color={"red"}
          >
            sold:{product.sold}
          </Typography>
          <Typography
            fontSize={"13"}
            fontStyle={"italic"}
            fontWeight={600}
            color={"red"}
          >
            view:{product.views}
          </Typography>
        </CardContent>
        <CardMedia
          component={"img"}
          src={product.images[0]}
          sx={{ objectFit: "cover", height: 200 }}
        />
        <CardContent>
          <Typography fontSize={10} color={"#999"}>
            {product.category}
          </Typography>
          <Typography
            align="center"
            fontSize={23}
            fontWeight={600}
            textTransform={"capitalize"}
          >
            {product.title.length > 35
              ? product.title.slice(0, 35) + "..."
              : product.title}
          </Typography>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Typography
              fontSize={28}
              fontWeight={600}
              color={"#555"}
              sx={{ textDecoration: "line-through", height: 40 }}
            >
              {product.discount ? formattedAmount(product.price ?? 0) : ""}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            <Typography fontSize={25} fontWeight={600} color={"green"}>
              {formattedAmount(product.lastPrice ?? 0)}/{product.unit}
            </Typography>
            <Typography fontSize={22} fontWeight={600} color={"orange"}>
              {product.discount}%
            </Typography>
          </Box>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="warning" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary">
            {product.status ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
});

export default ProductCartItem;
