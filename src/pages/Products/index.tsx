import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SpeedDial,
  Typography,
} from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useState } from "react";
import Search from "../../components/common/Search";
import { productActions } from "../../actions/productActions";
import { RootState } from "../../redux/store";
import ProductModal from "./components/ProductModal";
import { setProductModal } from "../../redux/slices/productSlice";
import { ProductType } from "../../types/productType";
import ViewListIcon from "@mui/icons-material/ViewList";
import ProductCartItem from "./components/ProductCardItem";
import ProductListItem from "./components/ProductListItem";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SelectShop from "../../components/SelectShop";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import _ from "lodash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonExportToExcel from "../../components/ButtonExportToExcel";

const dataFilter: Array<{ by: string }> = [
  { by: "createdAt" },
  { by: "quantity" },
  { by: "sold" },
  { by: "views" },
];

const Products = () => {
  const { products } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [changeView, setChangeView] = useState(true);
  const [onFillered, setOnFillered] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [filterBy, setFilterBy] = useState<"desc" | "asc">("asc");
  const [filterProductsList, setFilterProductsList] =
    useState<ProductType[]>(products);
  const [shopSelected, setShopSelected] = useState("");
  const [filterSelected, setFilterSelected] = useState("");

  useEffect(() => {
    dispatch(productActions.gets())
      .unwrap()
      .then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setOnFillered(true);

    let newProducts = [...products];

    if (shopSelected) {
      newProducts = newProducts.filter(
        (product) => product.shop._id === shopSelected
      );
    }

    if (filterSelected) {
      newProducts = _.orderBy(newProducts, [filterSelected], [filterBy]);
    }

    newProducts = newProducts.filter(
      (product) => product.status === visibility
    );

    setFilterProductsList(newProducts);
  }, [shopSelected, products, filterBy, filterSelected, visibility]);

  const handleOpenModel = useCallback(() => {
    dispatch(setProductModal({ open: true }));
  }, [dispatch]);

  useEffect(() => {
    const productsResearch = products.length
      ? products.filter((product: ProductType) =>
          product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    setFilterProductsList(productsResearch);
  }, [products, searchQuery]);

  const handleResetFiler = () => {
    setShopSelected("");
  };

  return isLoading ? (
    <LinearProgress color="success" />
  ) : (
    <Box>
      <Box
        mb={4}
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: "#000",
          width: "100%",
          zIndex: 1000,
          p: 1,
        }}
      >
        <Search
          placeholder="product..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Box width={250}>
          <SelectShop
            shopSelected={shopSelected}
            setShopSelected={setShopSelected}
          />
        </Box>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
          <Select
            value={filterSelected}
            label="Filter by"
            sx={{ width: 200 }}
            onChange={(e) => setFilterSelected(e.target.value)}
          >
            {dataFilter.map((data) => (
              <MenuItem value={data.by} key={data.by}>
                {data.by}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {filterSelected !== "" && (
          <IconButton
            onClick={() => setFilterBy(filterBy === "asc" ? "desc" : "asc")}
          >
            {filterBy === "desc" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>
        )}

        {onFillered && (
          <IconButton onClick={handleResetFiler}>
            <FilterAltOffIcon color={"success"} />
          </IconButton>
        )}

        <IconButton onClick={() => setVisibility(!visibility)}>
          {visibility ? (
            <VisibilityIcon color={"success"} />
          ) : (
            <VisibilityOffIcon />
          )}
        </IconButton>

        <IconButton onClick={() => setChangeView(!changeView)}>
          {changeView ? (
            <ViewModuleIcon color={"success"} />
          ) : (
            <ViewListIcon color={"success"} />
          )}
        </IconButton>

        <Typography>Total: {filterProductsList.length} products</Typography>

        {/* export excel */}
        <ButtonExportToExcel data={products} fileName={"Danh sách sản phẩm"} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          pt: 7,
          px: 2,
        }}
      >
        {(onFillered ? filterProductsList : products).map(
          (product: ProductType) =>
            changeView ? (
              <ProductListItem key={product._id} product={product} />
            ) : (
              <ProductCartItem key={product._id} product={product} />
            )
        )}
      </Box>
      <SpeedDial
        ariaLabel="Create an product"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        icon={<SpeedDialIcon />}
        onClick={handleOpenModel}
      />

      <ProductModal />
    </Box>
  );
};

export default Products;
