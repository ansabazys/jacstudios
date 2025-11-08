import api from "../services/api";
import { handleRequest } from "../services/helper";

export const getCategories = () => {
  return handleRequest(api.get("/categories"));
};

export const getCategoryProducts = (id) => {
  return handleRequest(api.get(`/categories/${id}`));
};

export const createCategory = (data) => {
  return handleRequest(api.post("/admin/categories", data));
};
export const updateCategory = (data, id) => {
  return handleRequest(api.put(`/admin/categories/${id}`, data));
};
export const deleteCategory = (id) => {
  return handleRequest(api.delete(`/admin/categories/${id}`));
};
