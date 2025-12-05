import API from "../api";

export const supervisorService = {
  getScrapData: async () => API.get("/scrap"),
  getOrdenes: async () => API.get("/produccion/ordenes"),
};

export const { getScrapData, getOrdenes } = supervisorService;