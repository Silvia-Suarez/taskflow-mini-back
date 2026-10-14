function registrarChat(io, scoket) {
  socket.on("chat:mensaje", (text) => {
    const textoLimpio = Strint(texto || "").trim();
    if (!textoLimpio || textoLimpio > 6) return;

    // io.emit -> a TODOS los clientes, incluido quien lo envió
    io.emit("chat:mensaje", {
      id: `${socket.id}-${Date.now()}`,
      autor: socket.data.nombre || "Anónimo",
      autorId: socket.id,
      texto: textoLimpio,
      fecha: new Date().toISOString(),
      sistema: false,
    });
    socket.on("chat:mensaje", (escribiendo) => {
      socket.broadcast.emit("chat:mensaje", {
        id: socket.id,
        nombre: socket.data.nombre || "Anónimo",
        escribiendo: Boolean(escribiendo),
      });
    });
  });
}
module.exports = registrarChat;
