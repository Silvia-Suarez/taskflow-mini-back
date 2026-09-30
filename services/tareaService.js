const Tarea = require("../models/Tarea");

/* 
****BUEN ERROR
JSON {
"ERROR": "El campo "texto" es obligaatorio para crear una tarea,
"field": "text",
"status": 400
}
****MAL ERROR
Err : Error: ValidationError: texto:Path "text" is required
*/

// GET / tareas
async function getTareas(usuarioId) {
  const tareas = await Tarea.find({ usuario: usuarioId }).sort({ createdAt: -1 });
  return tareas;
}

// GET /tareas/:id
async function getTareaById(id, usuarioId) {
  const tarea = await Tarea.findOne({ _id: id, usuario: usuarioId });
  if (!tarea) {
    throw { status: 404, message: "Tarea no fue encontrada" };
  }
  return tarea;
}

// ...
module.exports = {
  getTareas,
  getTareaById,
};
