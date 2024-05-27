import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { OrderItemType, OrderStatus } from "../../../types/orderType";
import { memo, useState } from "react";
import { UserType } from "../../../types/userType";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { orderActions } from "../../../actions/orderActions";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

interface Props {
  order: OrderItemType;
  user: UserType;
}
const OrderActions = memo((props: Props) => {
  const { order, user } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const admin = useAppSelector((state: RootState) => state.user.user);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageErr, setMessageErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const handleViewDetail = () => {
    navigate("/orders/details", { state: { order, user } });
  };

  return order.status === OrderStatus.pending ? (
    <Box sx={{ display: "flex", gap: 1, p: 1, flexDirection: "column" }}>
      <Button
        variant="contained"
        fullWidth
        color="success"
        onClick={handleViewDetail}
      >
        Chi tiết đơn hàng
      </Button>
      <LoadingButton
        fullWidth
        color="primary"
        variant="outlined"
        onClick={handleSubmit}
        loading={isLoading}
      >
        Xác nhận đơn hàng
      </LoadingButton>
      {!show ? (
        <LoadingButton
          fullWidth
          color="error"
          variant="outlined"
          onClick={() => setShow(!show)}
        >
          Hủy đơn hàng
        </LoadingButton>
      ) : (
        <Box>
          <TextField
            name="message"
            label="message"
            onChange={(e) => setMessage(e.target.value)}
            required
            fullWidth
            error={messageErr !== ""}
            helperText={messageErr}
          />
          <Box display={"flex"} flexDirection={"row"}>
            <LoadingButton
              fullWidth
              color="warning"
              variant="outlined"
              onClick={() => setShow(false)}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              fullWidth
              color="error"
              variant="contained"
              onClick={handleRefure}
            >
              Xác nhận
            </LoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  ) : order.status === OrderStatus.access ? (
    <Button variant="text" fullWidth color="success" disabled>
      Đang giao hàng
    </Button>
  ) : order.status === OrderStatus.done ? (
    <Box p={1}>
      <Button variant="text" fullWidth color="error" disabled>
        Đã hoàn thành
      </Button>
    </Box>
  ) : (
    <Box p={1}>
      <Button variant="text" fullWidth color="error" disabled>
        Đã hủy
      </Button>
      <Typography>
        Lí do:{" "}
        <b style={{ color: "red" }}>
          <i>{order.message}</i>
        </b>
      </Typography>
    </Box>
  );
});

export default OrderActions;
