import { Product } from "../Interfaces";
import { authApi, axi } from "./useAxios";

export const delete_product = async (id: number) => {
  await authApi.delete(`/products/delete/${id}/`);
};

export const post_product = async (data: Product) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("count_in_stock", data.count_in_stock.toString());
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image);
    }

    await authApi.post("/products/post/", formData);
  } catch (error) {
    console.error("Error al enviar el producto:", error);
    throw error;
  }
};

export const get_solo = async (slug: string) => {
  const response = await authApi.get(`/products/get/${slug}/`);
  return response.data;
};

export const get_solo_prod = async (id: number) => {
  const response = await authApi.get(`/products/get/admin/${id}/`);
  return response.data;
};

export const edit_product = async (data: Product) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("count_in_stock", data.count_in_stock.toString());
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    if (data.image && typeof data.image !== "string") {
      formData.append("image", data.image);
    }

    await authApi.put(`/products/edit/${data.id}/`, formData);
    // console.log("Server response:", Response);
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

export const get_products = async ({ pageParam = 1 }) => {
  const response = await axi.get(`/products/?page=${pageParam}&pages=9`);
  return response.data;
};
