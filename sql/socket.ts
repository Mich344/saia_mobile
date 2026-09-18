import { io } from "socket.io-client";
import ipconfig from "./ipconfig";

console.log("🔌 CREANDO SOCKET");
console.log("🔌 URL SOCKET:", ipconfig.replace(/\/$/, ""));

const socket = io(ipconfig.replace(/\/$/, ""), {
  transports: ["websocket"],
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("🟢 SOCKET CONECTADO:", socket.id);
});

socket.on("connect_error", (error) => {
  console.log("🔴 ERROR SOCKET:", error.message);
});

socket.on("disconnect", (reason) => {
  console.log("🟠 SOCKET DESCONECTADO:", reason);
});

export default socket;