import { Box, SpeedDial } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import Search from "../../components/common/Search";
import { RootState } from "../../redux/store";
import { setShopModal } from "../../redux/slices/shopSlice";
import { shopActions } from "../../actions/shopActions";
import ShopList from "./components/ShopList";
import ShopModal from "./components/ShopModal";
import { UserRole } from "../../types/userType";
import { allowCreateShop } from "../../resources/permissions";

const Shops = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const user = useAppSelector((state) => state.user.user);
  const shops = useAppSelector((state: RootState) => state.shop.shops);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(shopActions.gets());
  }, [dispatch]);

  const handleOpenModel = () => {
    dispatch(setShopModal({ open: true }));
  };

  const filterProductsList = useMemo(
    () =>
      shops.filter((shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [shops, searchQuery]
  );

  return (
    <Box>
      <Search
        placeholder="shop..."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <ShopModal />
      <ShopList shops={filterProductsList} />
      {allowCreateShop.includes(user.permissions?.name as UserRole) && (
        <SpeedDial
          ariaLabel="Create an shop"
          sx={{
            position: "fixed",
            bottom: 96,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          onClick={handleOpenModel}
        />
      )}
    </Box>
  );
};

export default Shops;
