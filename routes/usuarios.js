const express = require("express");
const { body } = require("express-validator");
const usuarioConroller = require("../controllers/usuarioController");
const { autenticar, autorizar } = require("../middleware/auth");
const { verificarValidaciones } = require("../middleware/validators");

const router = express.Router();

// Todas las rutas de usuarios requieren autenticación y autorización de administrador
router.use(autenticar);
router.use(autorizar("admin"));

const validarRol = [
  body("role").isIn(["admin", "user"]).withMessage("Rol inválido"),
];

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Se requiere rol admin
 */
router.get("/", usuarioConroller.getAllUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por id
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Se requiere rol admin
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", usuarioConroller.getUsuarioById);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       400:
 *         description: Un admin no puede eliminarse a sí mismo
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Se requiere rol admin
 */
router.delete("/:id", usuarioConroller.deleteUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar el rol de un usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       200:
 *         description: Rol actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Rol inválido
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Se requiere rol admin
 */
router.put("/:id", validarRol, verificarValidaciones, usuarioConroller.updateUsuarioRole);

module.exports = router;