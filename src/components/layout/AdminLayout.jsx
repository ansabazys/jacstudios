import React from "react";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import Footer from "../admin/Footer";
import { useAuth } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>loading</div>;


  if (!auth.role?.includes("admin")) {
    return (
      <div>
        <Navigate to={"/admin/login"} replace />
        <main>{children}</main>
      </div>
    )
  } else {
    return (
      <div className="w-full h-screen">
        {/* <Header /> */}
        <div className="h-full flex">
          <Sidebar />
          <main className="w-full">{children}</main>
        </div>

        {/* <Footer /> */}
      </div>
    );
  }
};

export default AdminLayout;
