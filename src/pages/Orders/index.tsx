import { useEffect, useMemo, useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import OrderItem from "./components/OrderItem";
import Tabs from "./components/Tabs";
import { OrderStatus } from "../../types/orderType";
import Search from "../../components/common/Search";
import { orderActions } from "../../actions/orderActions";

const Orders = () => {
  const { data: orders, loading } = useAppSelector(
    (state: RootState) => state.order
  );
  const [value, setValue] = useState<OrderStatus>(OrderStatus.pending);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state: RootState) => state.user.user);

  // const [isFilter, setIsFilter] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderActions.gets(user._id!))
      .unwrap()
      .then(() => setIsLoading(false));
  }, [dispatch, user]);

  const ordersFilter = useMemo(
    () =>
      orders.filter((order) => {
        const user = order.user;
        const username = user?.username.toLowerCase();
        const email = user?.email.toLowerCase();
        const firstname = user?.fullname.firstname.toLowerCase();
        const lastname = user?.fullname.lastname.toLowerCase();
        const lowerSearchQuery = searchQuery.toLowerCase();

        return (
          order.user &&
          order.order.status === value &&
          (username.includes(lowerSearchQuery) ||
            email.includes(lowerSearchQuery) ||
            firstname.includes(lowerSearchQuery) ||
            lastname.includes(lowerSearchQuery))
        );
      }),
    [value, orders, searchQuery]
  );

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Box>
      <Box
        position={"fixed"}
        display={"flex"}
        alignItems={"center"}
        sx={{ backdropFilter: "blur(50px)" }}
        width={"100%"}
      >
        <Button disabled sx={{ width: 200 }}>
          {ordersFilter.length} orders
        </Button>

        <Tabs value={value} setValue={setValue} />

        <Search
          placeholder={"Customer..."}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Box>
      <Box sx={{ pt: 8 }}>
        {loading && <LinearProgress />}

        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
          {ordersFilter.map((order, index) =>
            order.user ? (
              <OrderItem {...order} key={index} />
            ) : (
              <Box key={index}>
                <Typography>Anonymous</Typography>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Orders;
