import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { Box, LinearProgress } from "@mui/material";
import Sidebar from "../common/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { orderActions } from "../../actions/orderActions";
import { settingsActions } from "../../actions/settingActions";
import { socket } from "../../utils/socketConfirm";
import {
  onListentingMessage,
  requestPermissionNotification,
} from "../../utils/handlers/getFCMToken";
import PopupMessage from "../PopupMessage";
import { RootState } from "../../redux/store";
import { messageActions } from "../../actions/messageAction";
import { UserRole, UserType } from "../../types/userType";
import { roleActions } from "../../actions/roleActions";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.user);
  user && onListentingMessage(dispatch, user._id!);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth: UserType = await verifyToken();

      if (
        (isAuth && isAuth.permissions?.name === UserRole.admin) ||
        isAuth.permissions?.name === UserRole.superadmin ||
        isAuth.permissions?.name === UserRole.producer ||
        isAuth.permissions?.name === UserRole.staff
      ) {
        setIsLoading(false);
        dispatch(setUserReducer(isAuth));
        dispatch(settingsActions.getSetting(isAuth._id!));
        dispatch(orderActions.gets(isAuth._id!));
        dispatch(messageActions.gets(isAuth._id!));
        dispatch(roleActions.gets());
        requestPermissionNotification(isAuth._id!);
        if (
          (isAuth && isAuth.permissions?.name === UserRole.admin) ||
          isAuth.permissions?.name === UserRole.superadmin
        ) {
          socket.emit("admin-connect", {
            username: isAuth.username,
            id: isAuth._id,
          });
        }
      } else {
        NotificationToast({
          message: "You are not permissions",
          type: "error",
        });
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Box display={"flex"}>
        <Box component="nav">
          <Sidebar />
        </Box>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <PopupMessage />
      </Box>
    </Suspense>
  );
};

export default AdminLayout;
