const Usuario = require("../models/Usuario");

async function getAllUsuarios() {
  return await Usuario.find().sort({ createdAt: -1 });
}

async function getUsuarioById(id) {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }
  return usuario;
}

async function deleteUsuario(id) {
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }
  return usuario;
}

async function updateUsuarioRole(id, nuevoRol) {
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { role: nuevoRol },
    { new: true, runValidators: true }
  );
  if (!usuario) {
    throw { status: 404, message: 'Usuario no encontrado' };
  }
  return usuario;
}

module.exports = { getAllUsuarios, getUsuarioById, deleteUsuario, updateUsuarioRole };