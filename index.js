require("dotenv").config();
const app = require("./app");
const http = require("http");
const connectDB = require("./config/db");
const { Server } = require("socket.io");
const registrarSockets = require("./sockets");

// Conexión DB
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173"].filter(Boolean),
    method: ["GET", "POST"],
  },
});

registrarSockets(io);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Servidor HTTP + SOCKET.IO corriendo en el puerto ${PORT}`);
});
