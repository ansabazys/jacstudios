import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentAdmin, getCurrentUser, logOut } from "../api/Auth";
import { data, Navigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    role: null,
    data: null,
  });
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  useEffect(() => {
    const fetchUser = async () => {
      const response = isAdmin ? getCurrentAdmin() : getCurrentUser();
      const [result, err] = await response;

      if (result) {
        if (result.role) {
          setAuth({ role: result.role, data: result });
        } else {
          setAuth({ role: "user", data: result });
        }
      }

      setLoading(false);
    };
    fetchUser();
  }, []);

  const logout = async () => {
    const [data, err] = await logOut();

    if (data) {
      setAuth({ role: null, data: null });
      return <Navigate to={"/store"} />;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
