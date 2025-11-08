import api from "../services/api";
import { handleRequest } from "../services/helper";

export const getCart = () => {
  return handleRequest(api.get("/user/cart"));
};
export const removeCartItem = (id) => {
  return handleRequest(api.delete(`/user/cart/${id}`));
};

export const addToCart = (id, data) => {
  return handleRequest(api.post(`/user/cart/${id}`, data));
};
export const updateCart = (id, data) => {
  return handleRequest(api.put(`/user/cart/${id}`, data));
};