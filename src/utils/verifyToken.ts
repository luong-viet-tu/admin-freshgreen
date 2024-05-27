import { authAPI } from "./api/authApi";
import { getToken } from "./handlers/tokenHandler";

export const verifyToken = async () => {
  if (!getToken()) return false;
  try {
    const res = await authAPI.veryfyToken();
    if (!res.data) return false;
    return res.data.user;
  } catch (error) {
    return false;
  }
};
