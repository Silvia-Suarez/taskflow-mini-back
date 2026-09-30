function errorHandler(err, req, res, next) {
  console.error("Error:", err.messasge);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.name == "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ errors: "ID inválido en la db" });
  }

  // Email duplicado (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      error: `El ${field} ya está registrado`,
    });
  }
  
  return res
    .status(500)
    .json({ error: "Error interno del servidor, intente más tarde" });
}

module.exports = errorHandler;
