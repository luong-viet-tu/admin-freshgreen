import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Login"));
const AdminLayout = lazy(() => import("./components/layouts/AdminLayout"));
const AuthLayout = lazy(() => import("./components/layouts/AuthLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Orders = lazy(() => import("./pages/Orders"));
const OrdersDetails = lazy(() => import("./pages/OrderDetails"));
const Users = lazy(() => import("./pages/Users"));
const Products = lazy(() => import("./pages/Products"));
const News = lazy(() => import("./pages/News"));
const Shops = lazy(() => import("./pages/Shops"));
const Vouchers = lazy(() => import("./pages/Vouchers"));
const Categories = lazy(() => import("./pages/Categories"));
const Tags = lazy(() => import("./pages/Tags"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Notifications = lazy(() => import("./pages/Notification"));
const Delivery = lazy(() => import("./pages/Delivery"));
const Unit = lazy(() => import("./pages/Unit"));
const Roles = lazy(() => import("./pages/Roles"));

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // notificationOrder();

  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <ToastContainer />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/" index element={<HomePage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/details" element={<OrdersDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/unit" element={<Unit />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
