import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(email, password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh);
      
      toast.success("Bienvenido");
      navigate("/");
    },
    onError: () => {
      toast.error("Hubo un error");
    },
  });

  // funcion para el formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  if (loginMutation.isLoading) return <p>Cargando</p>;
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="contenedor-login">
      <div className="contenedor-formulario">
        <div className="formulario">
          <h1 className="">Bienvenido</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="email" className="">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                className=""
                placeholder="ej. correo@correo.com"
              />
            </div>
            <div className="campo">
              <label htmlFor="password" className="">
                Contraseña
              </label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className=""
              />
            </div>
            <div className="btn-registrar">
              <button type="submit" className="">
                Ingresar
              </button>
            </div>
            <p className="iniciar-sesion-link">
              ¿No tienes cuenta?{" "}
              <Link to={"/registro"} className="link">
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
