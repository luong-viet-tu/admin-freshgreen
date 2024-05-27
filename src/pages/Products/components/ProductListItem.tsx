import { memo, useCallback } from "react";
import { ProductType } from "../../../types/productType";
import { Avatar, Box, Card, IconButton, Typography } from "@mui/material";
import { formatDateInput } from "../../../utils/handlers/formatDateInput";
import { formattedAmount } from "../../../utils/handlers/formatMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { productActions } from "../../../actions/productActions";
import EditIcon from "@mui/icons-material/Edit";
import { setProductModal } from "../../../redux/slices/productSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { RootState } from "../../../redux/store";
import { RoleEnum } from "../../../types/roleType";

const ProductListItem = memo(({ product }: { product: ProductType }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);

  const handleEdit = useCallback(() => {
    dispatch(setProductModal({ open: true, data: product }));
  }, [dispatch, product]);

  const handleDelete = () => {
    product._id && dispatch(productActions.delete(product._id));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Card sx={{ width: "100%", padding: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            pt: 1,
            width: "100%",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            gap={1}
          >
            <Avatar
              src={product.shop.user?.avatar}
              alt={product.shop.name}
              sx={{ width: 40, height: 40 }}
            />
            <Typography fontSize={22} fontWeight={600}>
              {product.shop.name || "Anonymous"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
            }}
          >
            <Typography fontSize={"13"} fontStyle={"italic"}>
              {formatDateInput(product.createdAt)}
            </Typography>
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
            <Typography
              fontSize={"13"}
              fontStyle={"italic"}
              fontWeight={600}
              color={"red"}
            >
              Thu:
              {formattedAmount(product.sold ? product.sold * product.price : 0)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Avatar
            src={product.images[0]}
            variant="square"
            sx={{ objectFit: "cover", width: 100, height: 100 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              align="left"
              fontSize={25}
              fontWeight={600}
              textTransform={"capitalize"}
            >
              {product.title}{" "}
              <i>({product.tags.map((tag) => tag.name).join(", ")})</i>
            </Typography>

            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"80%"}
            >
              <Typography fontSize={10} color={"#999"} width={100}>
                {product.category}
              </Typography>
              <Typography
                fontSize={28}
                fontWeight={600}
                color={"#555"}
                sx={{ textDecoration: "line-through", height: 40, width: 100 }}
              >
                {product.discount ? formattedAmount(product.price ?? 0) : ""}
              </Typography>

              <Typography
                fontSize={22}
                fontWeight={600}
                width={50}
                color={"orange"}
              >
                {product.discount}%
              </Typography>
              <Typography fontSize={25} fontWeight={600} color={"green"}>
                {formattedAmount(product.lastPrice ?? 0)}/{product.unit}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {user.permissions?.roles.includes(RoleEnum.Delete) && (
                  <IconButton color="error" onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                )}
                {user.permissions?.roles.includes(RoleEnum.Update) && (
                  <IconButton color="warning" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton color="primary" disabled>
                  {product.status ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
});

export default ProductListItem;
