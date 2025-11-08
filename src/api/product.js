import api from "../services/api";
import { handleRequest } from "../services/helper";

export const getProducts = (page) => {
  return handleRequest(api.get(`/products?page=${page}`));
};
export const getProduct = (id) => {
  return handleRequest(api.get(`/products/${id}`));
};

export const createProduct = (data) => {
  return handleRequest(api.post("/admin/products", data));
};

export const updateProduct = (data, id) => {
  return handleRequest(api.put(`/admin/products/${id}`, data));
};

export const deleteProduct = (id, categoryId) => {
  return handleRequest(api.delete(`/admin/products/${id}/${categoryId}`));
};

export const searchProducts = async (params) => {
  return await handleRequest(api.get(`/search`, { params }));
};
export const sortProductByPrice = async (priceQuery) => {
  const url = priceQuery
    ? `/search?price=${priceQuery}`
    : `/search`;

  return await handleRequest(api.get(url));
};
