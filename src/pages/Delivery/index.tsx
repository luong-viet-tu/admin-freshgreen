import { Box } from "@mui/material";
import List from "./components/List";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { Form } from "./components/Form";
import { deliveryActions } from "../../actions/deliveryActions";
import { DeliveryType } from "../../types/deliveryType";

const Delivery = () => {
  const { methods, loading } = useAppSelector(
    (state: RootState) => state.delivery
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (data: DeliveryType) => {
    dispatch(deliveryActions.create(data));
  };

  useEffect(() => {
    dispatch(deliveryActions.gets());
  }, [dispatch]);

  return (
    <Box
      sx={{
        padding: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Form onSubmit={handleSubmit} isLoading={loading} />
      <List methods={methods} />
    </Box>
  );
};

export default Delivery;
