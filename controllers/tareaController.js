// Que creen que iría en esta parte?
// Todo Estudiante: Crear el controlador de tareas
const tareaService = require("../services/tareaService");
const asyncHandler = require("../utils/asyncHandler");

const getTareas = asyncHandler(async (req, res) => {
  const tareas = await tareaService.getTareas(req.usuario._id);
  res.status(200).json({
    tareas,
    mensaje: "Tareas obtenidas correctamente",
  });
});

const getTareaById = asyncHandler(async (req, res) => {
  const tarea = await tareaService.getTareaById(req.params.id, req.usuario._id);
  res.status(200).json({
    tarea,
    mensaje: "Tarea obtenida correctamente",
  });
});

module.exports = {
  getTareas,
  getTareaById,
};
