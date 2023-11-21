import { axi } from "./useAxios";

export const registerRequest = async (
  email: string,
  name: string,
  last_name: string,
  password: string
) => {
  await axi.post("usuarios/registrar/", { email, name, last_name, password });
};
