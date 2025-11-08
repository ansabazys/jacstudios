import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import Store from "../pages/Store/Store";
import Cart from "../pages/Cart/Cart";
import Account from "../pages/Account/Account";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Dashboard from "../pages/Admin/Dashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import ProductDetails from "../components/product/ProductDetails";
import OrderConfirm from "../pages/Store/OrderConfirm";
import Order from "../pages/Store/Order";
import OrderCancel from "../components/orders/OrderCancel";
import { Checkout } from "../pages/Store/Checkout";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/store" element={<Store />} />
      <Route path="/category/:id" element={<Store />} />
      <Route path="/store/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute allowedRole="user">
            <Account />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRole="user">
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRole="user">
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/confirm"
        element={
          <ProtectedRoute allowedRole="user">
            <OrderConfirm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute allowedRole="user">
            <OrderCancel />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <h1 className="py-30 flex justify-center items-center h-[90lvh]">
            404 Not Found
          </h1>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
