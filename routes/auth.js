const express = require("express");
const { body } = require("express-validator");
const authControllers = require("../controllers/authControllers");
const { verificarValidaciones } = require("../middleware/validators");
const { autenticar } = require("../middleware/auth");

const router = express.Router();

const validarRegistro = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es válido")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

// ... TODO: ValidarLogin?
// ... TODO: ValidarPerfil?
/**
 * @swagger
 * /api/auth/registrar:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 3
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.post(
  "/registrar",
  validarRegistro,
  verificarValidaciones,
  authControllers.registrar,
);
// ... TODO: ?

module.exports = router;
