import express from "express";
import connectToDB from "./database/db.js";
import ProductRoutes from "./routes/product.route.js";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (userName) => {
    users.set(socket.id, userName);

    io.emit("userJoined", userName);

    io.emit("userList", [...users.values()]);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    users.delete(socket.id);

    io.emit("userList", [...users.values()]);
  });
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", ProductRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

connectToDB();

export { server };
