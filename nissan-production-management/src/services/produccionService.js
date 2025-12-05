import API from "../api";

// ============================
// LISTAR TODAS LAS ÓRDENES
// /produccion/ordenes
// ============================
export const getOrdenes = () => API.get("/produccion/ordenes");

// ============================
// OBTENER ORDEN POR ID
// ============================
export const getOrdenById = (id) =>
  API.get(`/produccion/ordenes/${id}`);

// ============================
// CREAR ORDEN
// ============================
export const crearOrden = (ordenData) =>
  API.post("/produccion/ordenes", ordenData);

// ============================
// ACTUALIZAR ORDEN
// ============================
export const actualizarOrden = (id, ordenData) =>
  API.put(`/produccion/ordenes/${id}`, ordenData);

// ============================
// ELIMINAR ORDEN
// ============================
export const eliminarOrden = (id) =>
  API.delete(`/produccion/ordenes/${id}`);
