import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import { AuthProvider } from "./context/authContext";
import UserRoutes from "./routes/UserRoutes";
import UserLayout from "./components/layout/UserLayout";
import AdminLayout from "./components/layout/AdminLayout";
import { CartProvider } from "./context/CartContext";
import Landing from "./pages/Landing/Landing";
import { PageProvider } from "./context/PageContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PageProvider>
          <Routes>
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <AdminRoutes />
                </AdminLayout>
              }
            />
            <Route
              path="/*"
              element={
                <UserLayout>
                  <UserRoutes />
                </UserLayout>
              }
            />

            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </PageProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
