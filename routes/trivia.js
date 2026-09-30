const express = require("express");
const router = express.Router();
const triviaController = require("../controllers/triviaController");

/**
 * @swagger
 * /api/trivia:
 *   get:
 *     summary: Obtener preguntas de trivia
 *     tags: [Trivia]
 *     parameters:
 *       - in: query
 *         name: cantidad
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 5
 *         description: Número de preguntas (entre 1 y 20)
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           default: multiple
 *         description: Tipo de pregunta de Open Trivia DB
 *     responses:
 *       200:
 *         description: Preguntas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 preguntas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       pregunta:
 *                         type: string
 *                       opciones:
 *                         type: array
 *                         items:
 *                           type: string
 *                       categoria:
 *                         type: string
 *                       dificultad:
 *                         type: string
 *       400:
 *         description: La cantidad está fuera del rango 1-20
 */
router.get("/", triviaController.obtenerTrivia);

module.exports = router;
