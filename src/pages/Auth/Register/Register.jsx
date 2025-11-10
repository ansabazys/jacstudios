import React from "react";
import InputBox from "../../../components/common/InputBox";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./validation";
import { handleRequest } from "../../../services/helper";
import api from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/Auth";

const Register = () => {

  const {user} = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const formSubmit =async (data) => {
    const response = await registerUser(data)
    const [result, error] = response

    if(result) navigate("/store")
  }

  return (
    <div className="flex w-full py-30 items-center  justify-center">
      <div className="h-full w-full p-5 max-w-lg justify-center gap-5 items-start flex flex-col ">
        <h1 className="text-sm ">REGISTER</h1>
        <form onSubmit={handleSubmit(formSubmit)} className="flex w-full flex-col gap-5">
          <InputBox type="text" placeholder="Name" {...register("name")} />
          <InputBox type="email" placeholder="Email" {...register("email")} />
          <InputBox
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <Button value="continue" />
        </form>
        <p>Already have an account? <Link className="text-blue-500" to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
