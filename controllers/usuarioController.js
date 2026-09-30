const usuarioService = require('../services/usuarioService');
const asyncHandler = require('../utils/asyncHandler');

const getAllUsuarios = asyncHandler(async (req, res) => {
  const usuarios = await usuarioService.getAllUsuarios();
  res.json(usuarios.map(u => u.toPublic()));
});

const getUsuarioById = asyncHandler(async (req, res) => {
  const usuario = await usuarioService.getUsuarioById(req.params.id);
  res.json(usuario.toPublic());
});

const deleteUsuario = asyncHandler(async (req, res) => {
  // No permitir que un admin se elimine a sí mismo
  if (req.params.id === req.usuario._id.toString()) {
    throw { status: 400, message: 'No puedes eliminarte a ti mismo' };
  }
  await usuarioService.deleteUsuario(req.params.id);
  res.status(204).send();
});

const updateUsuarioRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const usuario = await usuarioService.updateUsuarioRole(req.params.id, role);
  res.json(usuario.toPublic());
});

module.exports = { getAllUsuarios, getUsuarioById, deleteUsuario, updateUsuarioRole };