import io from "socket.io-client";
import { host } from "./api/axiosClient";

export const socket = io(host, {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  timeout: 5000,
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});
