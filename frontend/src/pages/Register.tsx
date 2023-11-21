import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import "../styles/registro.css";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: () => registerRequest(email, name, lastName, password),
    onSuccess: () => {
      toast.success("Registro exitoso, ahora puedes iniciar sesión!");
      navigate("/login");
    },
    onError: () => {
      toast.error("Hubo un error");
    },
  });

  // funcion para comprobrar igualdad de contraseñas
  const handleMatch = () => {
    if (password !== rePassword) {
      return false;
    } else {
      return true;
    }
  };

  // funcion para el formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== rePassword) {
      toast.error("Las contraseñas deben coincidir");
    } else {
      registerMutation.mutate();
    }
  };

  if (registerMutation.isLoading) return <p>Cargando</p>;
  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="contenedor-registro">
      <div className="anuncio">
        <span>¿No estás registrado?</span>
        <p>¡Hazlo ahora mismo!</p>
      </div>
      <div className="contenedor-formulario">
        <div className="beneficios">
          <h2>Beneficios de tener una cuenta</h2>
          <ul>
            <li>Tener acceso exclusivo a ofertas y promociones.</li>
            <li>Comprar en un click.</li>
            <li>Guardar y actualizar tus datos o direcciones.</li>
          </ul>
        </div>
        <div className="formulario">
          <h1 className="">Crea una nueva cuenta</h1>
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
              <label htmlFor="name" className="">
                Nombre
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                name="name"
                id="name"
                className=""
                placeholder="nombre"
              />
            </div>
            <div className="campo">
              <label htmlFor="last-name" className="">
                Apellido
              </label>
              <input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                name="last-name"
                id="last-name"
                className=""
                placeholder="apellido"
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
            <div className="campo">
              <label htmlFor="re-password" className="">
                Confirmar Contraseña
              </label>
              <input
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
                type="password"
                name="re-password"
                id="re-password"
                placeholder="••••••••"
                className=""
              />
            </div>
            {handleMatch() ? false : <p className="texto-error">Passwords must match</p>}
            <div className="btn-registrar">
              <button type="submit" className="">
                Registrarse
              </button>
            </div>
            <p className="iniciar-sesion-link">
              ¿Ya tienes cuenta?{" "}
              <Link to={"/login"} className="link">
                Inicia Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
