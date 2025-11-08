import api from "../services/api";
import { handleRequest } from "../services/helper";

export const loginUser = (data) => {
    console.log(data)
  return handleRequest(api.post("/login", data));
};

export const loginAdmin = (data) => {
    console.log(data)
  return handleRequest(api.post("/admin/login", data));
};

export const registerUser = (data) => {
  return handleRequest(api.post("/register", data));
};

export const logOut = () => {
  return handleRequest(api.delete("/logout"));
};

export const getCurrentUser = () => {
  return handleRequest(api.get("/me"));
};

export const getCurrentAdmin = () => {
  return handleRequest(api.get("/admin/me"));
};  
