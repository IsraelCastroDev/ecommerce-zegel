import { Link, useNavigate, Navigate } from "react-router-dom";
import { registerRequest } from "../api/users";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import "../styles/registro.css";

import Loader from "../components/Loader";

import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailError, setEmailError] = useState("");

  const [viewPass, setViewPass] = useState(false);

  const showPass = () => {
    setViewPass(!viewPass);
  };

  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  useEffect(() => {
    if (email && !regexEmail.test(email)) {
      setEmailError("Ingresa un email válido");
    } else {
      setEmailError("");
    }
  }, [email]);

  const nameRegex = /^[a-zA-Z]+$/;
  useEffect(() => {
    if (name && !nameRegex.test(name)) {
      setNameError("El nombre solo puede contener letras");
    } else {
      setNameError("");
    }
  }, [name]);

  const lastNameRegex = /^[a-zA-Z]+$/;
  useEffect(() => {
    if (lastName && !lastNameRegex.test(lastName)) {
      setLastNameError("El apellido solo puede contener letras");
    } else {
      setLastNameError("");
    }
  }, [lastName]);

  const passwordRegex = /^(?=.*\d).{5,}$/;
  useEffect(() => {
    if (password && !passwordRegex.test(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 5 caracteres y contener al menos un número."
      );
    } else {
      setPasswordError("");
    }
  }, [password]);

  const registerMutation = useMutation({
    mutationFn: () => registerRequest(email, name, lastName, password),
    onSuccess: () => {
      toast.success("Registro exitoso, ahora puedes iniciar sesión!");
      navigate("/login");
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

  if (registerMutation.isLoading) return <Loader />;

  if (isAuth) return <Navigate to="/" />;

  return (
    <div className="contenedor-registro">
      <div className="mb-7">
        <span className="text-[2.5rem] font-semibold">
          ¿No estás registrado?
        </span>
        <p className="text-lg text-center font-semibold">¡Hazlo ahora mismo!</p>
      </div>
      <div className="contenedor-formulario font-semibold">
        <div className="beneficios">
          <h2>Beneficios de tener una cuenta</h2>
          <ul>
            <li>- Tener acceso exclusivo a ofertas y promociones.</li>
            <li>- Comprar en un click.</li>
            <li>- Guardar y actualizar tus datos o direcciones.</li>
          </ul>
        </div>
        <div className="formulario">
          <h1 className="">Crea una nueva cuenta</h1>
          <form className="" onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="email" className="">
                Email:
              </label>
              <div className="flex items-center justify-between bg-white pr-2 w-full">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="px-2 py-2 outline-none w-[90%]"
                  placeholder="ej. correo@correo.com"
                />
                <MdEmail size={25} />
              </div>
            </div>
            {emailError && <p className="texto-error">{emailError}</p>}
            <div className="campo">
              <label htmlFor="name" className="">
                Nombre
              </label>
              <div className="flex items-center justify-between bg-white pr-2 w-full">
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  name="name"
                  id="name"
                  className="px-2 py-2 outline-none w-[90%]"
                  placeholder="nombre"
                />
                <MdDriveFileRenameOutline size={25} />
              </div>
            </div>
            {nameError && <p className="texto-error">{nameError}</p>}
            <div className="campo">
              <label htmlFor="last-name" className="">
                Apellido
              </label>
              <div className="flex items-center justify-between pr-2 w-full bg-white">
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="px-2 py-2 outline-none w-[90%]"
                  placeholder="apellido"
                />
                <MdDriveFileRenameOutline size={25} />
              </div>
            </div>
            {lastNameError && <p className="texto-error">{lastNameError}</p>}
            <div className="campo">
              <label htmlFor="password" className="">
                Contraseña
              </label>
              <div className="flex items-center justify-between pr-2 bg-white w-full">
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
            {passwordError && <p className="texto-error">{passwordError}</p>}
            <div className="campo">
              <label htmlFor="re-password" className="">
                Confirmar Contraseña
              </label>
              <div className="flex items-center justify-between pr-2 bg-white w-full">
                <input
                  value={rePassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                  type={viewPass ? "text" : "password"}
                  name="re-password"
                  id="re-password"
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
            {handleMatch() ? (
              false
            ) : (
              <p className="texto-error">Las contraseñas deben coincidir</p>
            )}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-slate-800 py-2 px-5 rounded-md text-white mt-3 mb-3"
              >
                Registrarse
              </button>
            </div>
            <p className="text-center font-bold text-md text-slate-800">
              ¿Ya tienes cuenta?{" "}
              <Link
                to={"/login"}
                className="underline hover:text-slate-950 transition-colors duration-300 ease-in-out"
              >
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
