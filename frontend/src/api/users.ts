import { User } from "../Interfaces";
import { authApi, axi } from "./useAxios";
import { toast } from "react-hot-toast";

export const delete_user = async (id: number) => {
  await authApi.delete(`/usuarios/delete/${id}`);
};

export const get_solo_user = async (id: number) => {
  const response = await authApi.get(`/usuarios/get/solo/${id}/`);
  return response.data;
};

export const get_users = async () => {
  const response = await authApi.get("/usuarios/get/");
  return response.data;
};

export const edit_user = async (data: User) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);

    await authApi.put(`/usuarios/edit/${data.email}`, formData);
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

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
