import API from "../api";

// ============================
// LISTAR TODOS LOS SCRAP
// GET: /scrap
// ============================
export const getScrap = () => API.get("/scrap");

// ============================
// OBTENER SCRAP POR ID
// GET: /scrap/{id}
// ============================
export const getScrapById = (id) =>
  API.get(`/scrap/${id}`);

// ============================
// CREAR SCRAP
// POST: /scrap
// ============================
export const crearScrap = (scrapData) =>
  API.post("/scrap", scrapData);

// ============================
// ELIMINAR SCRAP
// DELETE: /scrap/{id}
// ============================
export const eliminarScrap = (id) =>
  API.delete(`/scrap/${id}`);