import { LoginReqType } from "../types/authType";
import { authAPI } from "../utils/api/authApi";
import { createToken, removeToken } from "../utils/handlers/tokenHandler";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginProps {
  data: LoginReqType;
  dispatch: AppDispatch;
}

interface LogoutProps {
  navigate: NavigateFunction;
}

export const authAction = {
  login: createAsyncThunk("auth/login", async (props: LoginProps, thunkAPI) => {
    try {
      const res = await authAPI.login(props.data);
      createToken(res.data.token);
      return true;
    } catch (error: any) {
      if (error.status === 400) return thunkAPI.rejectWithValue(error.data);
      throw error;
    }
  }),

  logout: (props: LogoutProps) => {
    removeToken();
    window.location.href = "/login";
    // props.navigate("/login");
  },
};
