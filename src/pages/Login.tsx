import {
  Box,
  Checkbox,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { authAction } from "../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logo } from "../resources/images";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState<string | null>("");
  const [passwordErrorText, setPasswordErrorText] = useState<string | null>("");

  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    setUsernameErrText("");
    setPasswordErrorText("");

    dispatch(authAction.login({ data, dispatch }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case "username":
                setUsernameErrText(e.msg);
                break;
              case "password":
                setPasswordErrorText(e.msg);
                break;
              default:
                break;
            }
          });
      });
  };

  return (
    <Container>
      <Paper
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 5,
          width: 500,
          gap: 3,
          mx: "auto",
          my: 20,
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: 150, marginLeft: "auto", marginRight: "auto" }}
        />
        <Typography align="center" fontSize={23} fontWeight={600}>
          Đăng nhập quản trị viên
        </Typography>

        <TextField
          name="username"
          type="text"
          label="Tài khoản"
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          name="password"
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"
          error={passwordErrorText !== ""}
          helperText={passwordErrorText}
        />
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Checkbox
            checked={showPassword}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography>Hiển mật khẩu</Typography>
        </Box>

        <LoadingButton
          fullWidth
          variant="contained"
          type="submit"
          loading={isLoading}
        >
          Đăng nhập
        </LoadingButton>
      </Paper>
    </Container>
  );
};

export default Login;
