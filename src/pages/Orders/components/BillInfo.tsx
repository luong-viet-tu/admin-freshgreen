import { Box, Typography, createStyles } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  OrderItemType,
  OrderStatus,
  PayMethod,
} from "../../../types/orderType";
import moment from "moment";
import { mainColor } from "../../../resources/color";
import { formattedAmount } from "../../../utils/handlers/formatMoney";

const billInfoItem = createStyles({
  display: "flex",
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
});

const BillInfo = (order: OrderItemType) => {
  const countProduct: number = useMemo(
    () => order.products.reduce((prev, p) => prev + p.count, 0),
    [order.products]
  );

  const [color, setColor] = useState<string>("primary");

  useEffect(() => {
    switch (order.status) {
      case OrderStatus.access:
        setColor("primary");
        break;
      case OrderStatus.pending:
        setColor("warning");
        break;
      case OrderStatus.refuse:
        setColor("error");
        break;
      case OrderStatus.done:
        setColor(mainColor);
        break;
      default:
        setColor("primary");
        break;
    }
  }, [order.status]);

  return (
    <Box sx={{ p: 2 }}>
      <hr style={{ paddingBottom: 10 }} />
      <Box sx={billInfoItem}>
        <Typography>Tình trạng đơn hàng</Typography>
        <Typography
          fontWeight={600}
          color={color}
          sx={{ p: 0.3, py: 0, outline: "1px solid #ddd", borderRadius: 5 }}
        >
          {order.status}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Thời gian đặt hàng</Typography>
        <Typography fontWeight={600}>
          {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Số lượng sản phẩm:</Typography>
        <Typography fontWeight={600}>{countProduct}</Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Voucher sử dụng:</Typography>
        <Typography fontWeight={600}>
          {order.voucherUsed.voucher || "Không sử dụng"}
        </Typography>
        <Typography fontWeight={600} color={mainColor} fontSize={20}>
          {order.voucherUsed.discount !== 0
            ? `${order.voucherUsed.discount}%`
            : ""}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Tổng số tiền:</Typography>
        <Typography fontSize={23} color={"mainColor"} fontWeight={600}>
          {formattedAmount(order.totalPrice)}
        </Typography>
      </Box>
      <Box sx={billInfoItem}>
        <Typography>Phương thức thanh toán:</Typography>
        <Typography fontWeight={600}>
          {order.pay.method === PayMethod.payNow
            ? "Thanh toán trực tuyến"
            : "Thanh toán khi nhận hàng"}
        </Typography>
      </Box>
    </Box>
  );
};

export default BillInfo;
