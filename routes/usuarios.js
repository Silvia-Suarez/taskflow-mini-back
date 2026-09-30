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

router.get("/", usuarioConroller.getAllUsuarios);
router.get("/:id", usuarioConroller.getUsuarioById);
router.delete("/:id", usuarioConroller.deleteUsuario);
router.put("/:id", validarRol, verificarValidaciones, usuarioConroller.updateUsuarioRole);

module.exports = router;