const express = require("express");
const { body } = require("express-validator");
const { autenticar } = require("../middleware/auth");
const tareaController = require("../controllers/tareaController");
const { verificarValidaciones } = require("../middleware/validators");
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

const router = express.Router();

const validarTarea = [
  body("text")
    .notEmpty()
    .withMessage("El texto es obligatorio")
    .isLength({ min: 5, max: 200 })
    .withMessage("El texto debe tener entre 5 y 200 caracteres")
    .trim(),
  body("prioridad")
    .optional()
    .isIn(["baja", "media", "alta"])
    .withMessage("La prioridad debe ser baja, media o alta"),
  body("completed").optional().isBoolean(),
];

// GET / tareas
router.get("/", tareaController.getTareas);

// GET /tareas/:id
router.get("/:id", tareaController.getTareaById);

// POST /tareas
// PUT /tareas/:id
// DELETE /tareas/:id

module.exports = router;
