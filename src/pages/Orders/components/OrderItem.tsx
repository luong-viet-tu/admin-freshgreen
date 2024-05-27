import { OrderType } from "../../../types/orderType";
import { Box, Paper } from "@mui/material";
import UserInfo from "./UserInfo";
import { ProductCartType } from "../../../types/cartType";
import OrderProductItem from "./OrderProductItem";
import BillInfo from "./BillInfo";
import OrderActions from "./OrderActions";

const OrderItem = (data: OrderType) => {
  return (
    <Paper elevation={8} sx={{ m: 3, outline: "1px solid #ddd", width: 480 }}>
      {/* customer information */}
      <UserInfo {...data.user} />

      {/* product list */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: 300,
          overflowY: "auto",
          p: 1,
        }}
      >
        {data.order.products.map((product: ProductCartType) => (
          <Paper elevation={8} key={product._id}>
            <OrderProductItem {...product} />
          </Paper>
        ))}
      </Box>

      <BillInfo {...data.order} />

      <hr />
      <OrderActions {...data} />
    </Paper>
  );
};

export default OrderItem;
