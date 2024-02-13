import { Product } from "../Interfaces";
import { authApi, axi } from "./useAxios";

// Usando Axios para hacer la peticiones al backend

/**
 * @description funcion para eliminar productos
 * @param id id del producto a elminar
 */
export const delete_product = async (id: number) => {
  await authApi.delete(`/products/delete/${id}/`);
};

/**
 * @description funcion para guardar/enviar los productos a la bd
 * @param data estructura del objeto Product
 */
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

/**
 * @description funcion que obtiene un producto
 * @param slug identificador de un producto en especifico
 * @returns respuesta con el producto en especifico
 */
export const get_solo = async (slug: string) => {
  const response = await authApi.get(`/products/get/${slug}/`);
  return response.data;
};

/**
 * @description funcion que obtiene un producto
 * @param id identificador de un producto en especifico
 * @returns rspuesta con el producto en especifico
 */
export const get_solo_prod = async (id: number) => {
  const response = await authApi.get(`/products/get/admin/${id}/`);
  return response.data;
};

/**
 * @description funcion para editar los productos
 * @param data estructura del objeto Product
 */
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
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};

/**
 * @description funcion obtiene todos los productos
 * @param param0 pagina numero 1
 * @returns lista de productos guardados en la bd
 */
export const get_products = async ({ pageParam = 1 }) => {
  const response = await axi.get(`/products/?page=${pageParam}&pages=9`);
  return response.data;
};

export const create_review = async (
  description: string,
  rating: number,
  productId: number
) => {
  await authApi.post(`/products/review/${productId}/`, {
    description,
    rating,
  });
};
