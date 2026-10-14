const registrarChat = require("./chatSocket");
const registrarTareas = require("./tareasSocet");

const usuarios = new Map();

function listaUsuarios() {
  return Array.from(usuarios.value);
}

function registrarSockets(io) {
  io.on("connection", (socket) => {
    console.log("Cliente conectado");
    socket.on("usuario:unirse", (nombre) => {
      const nombreNormalizado = String(nombre || "Anónimo").trim();
      usuarios.set(socket.id, { nombre: nombreNormalizado });
      socket.data.nombre = nombreNormalizado;

      io.emit("usuarios:lista", listaUsuarios);
      socket.broadcast.emit("chat:mensaje", {
        id: Date.now(),
        autor: "TaskFlow",
        texto: `${nombreNormalizado} se unio a TaskFlow`,
        fecha: new Date().toISOString(),
      });
      registrarChat();
    });
  });
}

module.exports = registrarSockets;
