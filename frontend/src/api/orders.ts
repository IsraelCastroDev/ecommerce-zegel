import { authApi, axi } from "./useAxios";
import { Order } from "../Interfaces";

export const create_order = async (data: Order) => {
  await authApi.post("orders/create/", data);
};
