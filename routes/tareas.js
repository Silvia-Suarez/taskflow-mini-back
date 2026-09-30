const express = require("express");
const { body } = require("express-validator");
const { autenticar } = require("../middleware/auth");
const tareaController = require("../controllers/tareaController");
const { verificarValidaciones } = require("../middleware/validators");

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

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tareas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tarea'
 *                 mensaje:
 *                   type: string
 */
router.get("/", tareaController.getTareas);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por id
 *     tags: [Tareas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tarea:
 *                   $ref: '#/components/schemas/Tarea'
 *                 mensaje:
 *                   type: string
 *       404:
 *         description: Tarea no encontrada
 */
router.get("/:id", tareaController.getTareaById);

// POST /tareas
// PUT /tareas/:id
// DELETE /tareas/:id

module.exports = router;
