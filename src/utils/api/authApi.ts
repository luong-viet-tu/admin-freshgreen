import { LoginReqType } from "../../types/authType";
import axiosClient from "./axiosClient";

export const authAPI = {
  login: (payload: LoginReqType) => axiosClient.post("/auth/login", payload),
  veryfyToken: () => axiosClient.post("/auth/verify-token"),
};
