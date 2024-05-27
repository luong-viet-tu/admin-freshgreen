import { LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { UserRole } from "../../types/userType";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyToken();
      if (
        (isAuth && isAuth.permissions?.name === UserRole.admin) ||
        isAuth.permissions?.name === UserRole.superadmin ||
        isAuth.permissions?.name === UserRole.producer ||
        isAuth.permissions?.name === UserRole.staff
      ) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
