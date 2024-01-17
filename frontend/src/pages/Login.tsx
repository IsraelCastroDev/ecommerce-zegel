import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import "../styles/login.css";
import Loader from "../components/Loader";

import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [viewPass, setViewPass] = useState(false);

  const showPass = () => {
    setViewPass(!viewPass);
  };

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(email, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh);

      toast.success("Bienvenido");
      navigate("/");
    },
    onError: () => {
      toast.error("Contraseña o usuario incorrecto");
    },
  });

  // funcion para el formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  if (loginMutation.isLoading) return <Loader />;
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="contenedor-login">
      <div className="contenedor-formulario">
        <div className="formulario">
          <h1 className="font-bold text-md">
            Hola 😀, ¡inicia sesión en tu cuenta!
          </h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="campo">
              <label
                htmlFor="email"
                className="text-slate-800 font-bold text-lg"
              >
                Email:
              </label>
              <div className="flex justify-between items-center bg-white px-1 w-full">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="px-2 py-2 outline-none w-[90%]"
                  placeholder="ej. correo@correo.com"
                />
                <div>
                  <MdEmail size={25} />
                </div>
              </div>
            </div>
            <div className="campo">
              <label
                htmlFor="password"
                className="text-slate-800 font-bold text-lg"
              >
                Contraseña
              </label>
              <div className="flex justify-between items-center bg-white px-1 w-full">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={viewPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="px-2 py-2 outline-none w-[90%]"
                />
                <div className="cursor-pointer" onClick={showPass}>
                  {viewPass ? (
                    <HiMiniEyeSlash size={25} />
                  ) : (
                    <IoEyeSharp size={25} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mb-2 ">
              <button
                type="submit"
                className="bg-slate-800 px-7 py-2 rounded-md text-white font-semibold"
              >
                Ingresar
              </button>
            </div>
            <p className="text-slate-800 font-bold text-md text-center justify-center transition-colors duration-300 ease-in-out">
              ¿No tienes cuenta?{" "}
              <Link
                to={"/registro"}
                className="link underline hover:text-slate-950"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
