import { authApi } from "./useAxios";
import { Order } from "../Interfaces";

export const delete_order = async (id: number) => {
  await authApi.delete(`/orders/delete/${id}/`);
};

export const get_solo_order = async (id: number) => {
  const response = await authApi.get(`orders/order/${id}/`);
  return response.data;
};

export const create_order = async (data: Order) => {
  await authApi.post("orders/create/", data);
};

export const get_orders = async () => {
  const response = await authApi.get(`/orders/`);
  return response.data;
};

export const edit_order = async (id: number) => {
  await authApi.put(`/orders/deliver/${id}/`);
};

export const my_orders = async () => {
  const response = await authApi.get("orders/my/orders/");
  return response.data;
};
