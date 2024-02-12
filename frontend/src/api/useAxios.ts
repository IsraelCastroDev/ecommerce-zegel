import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode";
import { Token } from "../Interfaces";

function logout() {
  useAuthStore.getState().logout();
  window.location.href = "/login";
}

// url del servidor
const baseURL = "http://127.0.1:8000";

/**
 * @description funcion que crea la url para las peticiones usando Axios para simplificar las llamadas a la api
 */
export const axi = axios.create({
  baseURL,
});

/**
 * Instancia de API de Autenticación
 *
 * Este módulo exporta una instancia de Axios configurada para realizar solicitudes a API relacionadas con la autenticación.
 * Incluye una URL base y permite el envío de credenciales en solicitudes de origen cruzado.
 *
 * @type {AxiosInstance}
 * @see https://axios-http.com/docs/instance
 */

/**
 * Instancia de Axios para solicitudes a API relacionadas con la autenticación.
 *
 * @const {AxiosInstance}
 * @property {string} baseURL - La URL base para las solicitudes a la API.
 * @property {boolean} withCredentials - Indica si se deben enviar credenciales con solicitudes de origen cruzado.
 * @see https://axios-http.com/docs/instance#request-config
 */
export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use(async (config) => {
  // Obtiene el token de acceso del estado de autenticación
  const token: string = useAuthStore.getState().access;

  // Establece el encabezado de autorización en la configuración de la solicitud
  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders;

  // Decodifica el token para obtener información, asumiendo que está usando JSON Web Tokens (JWT)
  const tokenDecoded: Token = jwt_decode(token);

  // Calcula la fecha de vencimiento del token
  const expiration = new Date(tokenDecoded.exp * 1000);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  // Verifica si el token está a punto de caducar en los próximos cinco minutos
  if (expiration.getTime() - now.getTime() < fiveMinutes) {
    try {
      // Intenta realizar una solicitud para actualizar el token utilizando el token de actualización
      const res = await axi.post("/usuarios/refresh/", {
        refresh: useAuthStore.getState().refresh,
      });

      // Actualiza el estado de autenticación con los nuevos tokens
      useAuthStore.getState().setToken(res.data.access, res.data.refresh);
    } catch (err) {
      // Si hay un error al intentar actualizar el token, cierra la sesión (logout)
      logout();
    }
  }

  // Devuelve la configuración de la solicitud actualizada con el encabezado de autorización
  return config;
});
