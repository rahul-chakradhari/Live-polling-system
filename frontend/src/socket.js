// src/socket.js
import { io } from "socket.io-client";
export const socket = io("https://livepolling-backend.onrender.com", {
  transports: ["websocket"],
});
