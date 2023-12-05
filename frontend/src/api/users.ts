import { axi } from "./useAxios";
import { toast } from "react-hot-toast";

export const registerRequest = async (
  email: string,
  name: string,
  last_name: string,
  password: string
) => {
  // Lógica de validación
  if (!email || !name || !last_name || !password) {
    toast.error("Todos los campos son obligatorios");
    throw new Error("Todos los campos son obligatorios");
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    toast.error("Ingresa un email válido");
    throw new Error("Ingresa un email válido");
  }

  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    toast.error("El nombre solo puede contener letras");
    throw new Error("El nombre solo puede contener letras");
  }

  const lastNameRegex = /^[a-zA-Z]+$/;
  if (!lastNameRegex.test(last_name)) {
    toast.error("El apellido solo puede contener letras");
    throw new Error("El apellido solo puede contener letras");
  }

  const passwordRegex = /^(?=.*\d).{5,}$/;
  if (!passwordRegex.test(password)) {
    toast.error(
      "La contraseña debe tener al menos 5 caracteres y contener al menos un número."
    );
    throw new Error(
      "La contraseña debe tener al menos 5 caracteres y contener al menos un número."
    );
  }

  // Lógica de solicitud al servidor
  try {
    const response = await axi.post("usuarios/registrar/", {
      email,
      name,
      last_name,
      password,
    });
    // Puedes manejar la respuesta del servidor según tus necesidades
    console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    // Puedes manejar los errores específicos del servidor aquí
    console.error("Error durante la solicitud al servidor:", error);
    toast.error("Los datos ingresados están siendo usados por otra cuenta");
    throw new Error("Hubo un error durante el registro");
  }
};

export const loginRequest = async (email: string, password: string) => {
  const response = await axi.post("usuarios/login/", { email, password });
  return response;
};
