import React from "react";
import InputBox from "../../../components/common/InputBox";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import { loginAdmin, loginUser } from "../../../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const formSubmit = async (data) => {
    const response = loginUser(data);
    const [result, error] = await response;

    console.log(error)

    if(error) {
      toast(error.message)
    }

    setAuth({...auth, data: result});

    if (result) navigate("/store");
  };

  return (
    <div className="flex w-full py-30 items-center  justify-center">
      <div className="h-full w-full p-5 max-w-lg justify-center gap-5 items-start flex flex-col ">
        <h1 className="text-sm ">LOGIN</h1>
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
        <p>Don't have an account? <Link className="text-blue-500" to={"/register"} >Register</Link></p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
