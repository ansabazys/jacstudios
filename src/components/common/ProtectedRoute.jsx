import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { auth, loading } = useAuth();
  if (loading) return <div>Loading</div>;

  if (!auth?.data) {
    return (
      <Navigate
        to={allowedRole === "admin" ? "/admin/login" : "/store"}
        replace
      />
    );
  }

  return <div>{children}</div>;
}
