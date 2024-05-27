import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { ShopType } from "../types/shopType";
import { shopActions } from "../actions/shopActions";

interface SelectShopProps {
  shopSelected: string;
  setShopSelected: (shopSelected: string) => void;
}

const SelectShop = (props: SelectShopProps) => {
  const dispatch = useAppDispatch();
  const shops = useAppSelector((state: RootState) => state.shop.shops);

  useEffect(() => {
    dispatch(shopActions.gets());
  }, [dispatch]);

  return !shops.length ? (
    <CircularProgress />
  ) : (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Shop</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.shopSelected}
        label="Shop"
        onChange={(e) => props.setShopSelected(e.target.value)}
      >
        {shops.map((shop: ShopType) => (
          <MenuItem key={shop._id} value={shop._id}>
            {shop.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectShop;
