import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Register from "../pages/Auth/Register/Register";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLogin from "../pages/Admin/AdminLogin";
import Category from "../pages/Admin/Category";
import Products from "../pages/Admin/Products";
import Users from "../pages/Admin/Users";
import Orders from "../pages/Admin/Orders";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole={"admin"}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/category"
        element={
          <ProtectedRoute allowedRole={"admin"}>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRole={"admin"}>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRole={"admin"}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRole={"admin"}>
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
