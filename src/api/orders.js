import api from "../services/api";
import { handleRequest } from "../services/helper";

export const getOrders = () => {
  return handleRequest(api.get("/user/orders"));
};
export const getOrdersAdmin = () => {
  return handleRequest(api.get("/admin/orders"));
};

export const createOrder = (data) => {
  return handleRequest(api.post("/user/orders", data));
};

export const updateOrder = (orderId, data) => {
  return handleRequest(api.put(`/user/orders/${orderId}`, data));
};
export const updateOrderAdmin = (orderId, data) => {
  return handleRequest(api.put(`/admin/orders/${orderId}`, data));
};

export const getTotalRevenue = () => {
  return handleRequest(api.get("/admin/orders/totalrevenue"));
};

export const getOrdersByMonth = () => {
  return handleRequest(api.get("/admin/orders/orderByMonth"));
};
