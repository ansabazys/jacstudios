import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigate, useNavigate } from "react-router-dom";
import { loginSchema } from "../Auth/Login/validation";
import InputBox from "../../components/common/InputBox";
import { loginAdmin, loginUser } from "../../api/Auth";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  if(auth.role?.includes("admin")) return <Navigate to={"/admin/dashboard"} />

  const formSubmit = async (data) => {
    const response = loginAdmin(data);
    const [result, error] = await response;

    setAuth({ role: result.role, data: result });

    if (result) navigate("/admin/dashboard");
  };

  return (
    <div className="flex w-full py-30 items-center  justify-center">
      <div className="h-full w-full p-5 max-w-lg justify-center gap-5 items-start flex flex-col ">
        <h1 className="text-sm ">ADMIN LOGIN</h1>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="flex w-full flex-col gap-5 "
        >
          <InputBox
            type="email"
            placeholder="Email"
            {...register("email")}
            errors={errors?.email?.message}
          />
          <InputBox
            type="password"
            placeholder="Password"
            {...register("password")}
            errors={errors?.password?.message}
          />
      
          <Button type="submit"  value="continue" />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
