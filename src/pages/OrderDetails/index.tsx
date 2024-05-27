import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderItemType, OrderStatus, PayMethod } from "../../types/orderType";
import { formattedAmount } from "../../utils/handlers/formatMoney";
import moment from "moment";
import { mainColor } from "../../resources/color";
import OrderProductItem from "../Orders/components/OrderProductItem";
import { UserType, addressOfUser, fullnameOfUser } from "../../types/userType";
import { useState } from "react";
import { orderActions } from "../../actions/orderActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { LoadingButton } from "@mui/lab";

const OrderDetails = () => {
  const location = useLocation();

  const order: OrderItemType = location.state.order;
  const user: UserType = location.state.user;

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const admin = useAppSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(
      orderActions.submitStatusOrder({
        adminId: admin._id!,
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.access,
      })
    )
      .unwrap()
      .finally(() => {
        setIsLoading(false);
        navigate("/orders");
      });
  };
  const handleRefure = () => {
    if (message.length < 5) {
      setMessageErr("Lý do không hợp lệ");
      return;
    }
    dispatch(
      orderActions.submitStatusOrder({
        adminId: admin._id!,
        userId: user._id as string,
        orderId: order._id as string,
        status: OrderStatus.refuse,
        message,
      })
    );
    setMessageErr("");
    setShow(false);
    navigate("/orders");
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 5,
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
    >
      <Paper
        sx={{
          width: "60%",
          padding: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <Box>
          <Typography sx={{ flex: 1 }}>
            Mã đơn hàng <i>#{order._id}</i>
          </Typography>
          <Typography sx={{ flex: 1 }}>
            Tình trạng đơn hàng{" "}
            <i
              style={{
                padding: 1,
                borderRadius: 20,
              }}
            >
              <b>{order.status}</b>
            </i>
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight={600} fontSize={25} sx={{ mb: 2 }}>
            Thông tin thanh toán
          </Typography>
          <Typography>
            Phương thức thanh toán:{" "}
            <b>
              {order.pay.method === PayMethod.lastPay
                ? "Thanh toán sau"
                : "Thanh toán online"}
            </b>
          </Typography>
          <Typography>
            Tổng số tiền: <b> {formattedAmount(order.pay.amount)}</b>
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight={600} fontSize={25} sx={{ mb: 2 }}>
            Mã giảm giá đã sử dụng
          </Typography>
          <Typography>
            Mã giảm giá:{" "}
            <i>
              <b>{order.voucherUsed.voucher}</b>
            </i>
          </Typography>
          <Typography>
            Đã giảm: <b>{order.voucherUsed.discount}%</b>
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={25} fontWeight={600}>
            Thời gian đặt hàng
          </Typography>
          <Typography>
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize={25} fontWeight={600}>
            Tổng tiền hàng
          </Typography>
          <Typography fontSize={30} fontWeight={600} color={mainColor}>
            {formattedAmount(order.totalPrice)}
          </Typography>
        </Box>
        <Box sx={{ maxHeight: 500, overflow: "auto" }}>
          {order.products.map((product) => (
            <Paper elevation={9} sx={{ mb: 1 }} key={product._id!}>
              <OrderProductItem {...product} />
            </Paper>
          ))}
        </Box>
      </Paper>

      <Box
        sx={{ width: "40%", display: "flex", flexDirection: "column", gap: 5 }}
      >
        <Paper
          sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography fontSize={25} fontWeight={600} sx={{ mb: 2 }}>
            Thông tin khách hàng
          </Typography>
          <Typography>
            Tên khách hàng:{" "}
            <i>
              <b>{fullnameOfUser(user.fullname)}</b>
            </i>
          </Typography>
          <Typography>
            Số điện thoại:{" "}
            <i>
              <b>{user.phone}</b>
            </i>
          </Typography>
          <Typography>
            Địa chỉ Email:{" "}
            <i>
              <b>{user.email}</b>
            </i>
          </Typography>
          <Typography>
            Ngày tham gia:{" "}
            <i>
              <b>{moment(user.createdAt).fromNow()}</b>
            </i>
          </Typography>
        </Paper>
        <Paper sx={{ padding: 2 }}>
          <Typography fontSize={25} fontWeight={600} sx={{ mb: 2 }}>
            Địa chỉ giao hàng
          </Typography>
          <Typography>
            Tỉnh/Thành phố:{" "}
            <i>
              <b>{user.address.city}</b>
            </i>
          </Typography>
          <Typography>
            Quận/huyện:{" "}
            <i>
              <b>{user.address.district}</b>
            </i>
          </Typography>
          <Typography>
            Phường/xã:{" "}
            <i>
              <b>{user.address.ward}</b>
            </i>
          </Typography>
          <Typography>
            Đường:{" "}
            <i>
              <b>{user.address.street}</b>
            </i>
          </Typography>

          <Typography sx={{ mt: 3 }}>
            Chi tiết:{" "}
            <i>
              <b>{addressOfUser(user.address)}</b>
            </i>
          </Typography>
        </Paper>
      </Box>
      <Paper
        sx={{
          flexGrow: 1,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 300,
        }}
      >
        <LoadingButton
          loading={isLoading}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Xác nhận
        </LoadingButton>
        {!show ? (
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={() => setShow(true)}
          >
            Từ chối
          </Button>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              fullWidth
              multiline
              placeholder="Lý do từ chối..."
              onChange={(e) => setMessage(e.target.value)}
              error={messageErr !== ""}
              helperText={messageErr}
            />
            <LoadingButton
              fullWidth
              variant="contained"
              color="error"
              onClick={handleRefure}
            >
              Submit
            </LoadingButton>
            <Button
              fullWidth
              variant="outlined"
              color="warning"
              onClick={() => setShow(false)}
            >
              Huỷ
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default OrderDetails;
