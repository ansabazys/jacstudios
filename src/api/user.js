import api from "../services/api";
import { handleRequest } from "../services/helper";

export const getUsers = (page, limit) => {
  return handleRequest(api.get(`/admin/users?page=${page}&limit=${limit}`));
};

export const updateUser = (id, data) => {
  return handleRequest(api.put(`/admin/users/${id}`, data));
};

export const updateByUser = (data) => {
  return handleRequest(api.put(`/user`, data));
};
