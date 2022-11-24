import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  //abrir conexion
  console.log("user connected");
  //Emitir eventos
  socket.on("message", (msg) => {
    console.log("message : " + msg);
    io.emit("message", msg);
  });
  //Cerrar conexion
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  console.log("hello world");
  res.send("hello world");
});

export { server };
