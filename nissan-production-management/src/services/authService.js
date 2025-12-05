import API from "../api";

// ===================
// LOGIN
// ===================
export const login = (correo, contrasena) => {
  return API.post("/Auth/login", {
    Correo: correo,
    Contrasena: contrasena,
  });
};

// ===================
// REGISTRO
// ===================
export const register = (nombre, correo, contrasena, rolId) => {
  return API.post("/Auth/register", {
    Nombre: nombre,
    Correo: correo,
    Contrasena: contrasena,
    RolId: rolId,
  });
};

// ===================
// LISTAR USUARIOS
// GET: /Auth/usuarios
// ===================
export const getUsuarios = () => API.get("/Auth/usuarios");

// ===================
// OBTENER USUARIO POR ID
// ===================
export const getUsuarioById = (id) => API.get(`/Auth/usuarios/${id}`);

// ===================
// ACTUALIZAR USUARIO
// ===================
export const updateUsuario = (id, data) =>
  API.put(`/Auth/usuarios/${id}`, data);

// ===================
// ELIMINAR USUARIO
// ===================
export const deleteUsuario = (id) =>
  API.delete(`/Auth/usuarios/${id}`);

