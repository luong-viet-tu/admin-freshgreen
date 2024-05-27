import axios from "axios";
import queryString from "query-string";
import { getToken } from "../handlers/tokenHandler";
import { NotificationToast } from "../handlers/NotificationToast";

export const host = "http://localhost:5000";
const baseURL = `${host}/api/v1`;
export const clientURL = "http://localhost:9999";

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any): string => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Beaber ${getToken()}`,
      },
    };
  },
  (e) => {
    return Promise.reject(e);
  }
);
axiosClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      NotificationToast({ message: err, type: "error" });
      return;
    }
    throw err.response;
  }
);

export default axiosClient;
