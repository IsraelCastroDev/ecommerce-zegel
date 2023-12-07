import axios, { AxiosRequestHeaders } from "axios";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode";
import { Token } from "../Interfaces";

function logout() {
  useAuthStore.getState().logout()
  window.location.href = "/login"
}

const baseURL = "http://127.0.1:8000";

export const axi = axios.create({
  baseURL,
});

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use(async (config) => {
  const token: string = useAuthStore.getState().access;
  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders;

  const tokenDecoded: Token = jwt_decode(token);

  const expiration = new Date(tokenDecoded.exp * 1000);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  if (expiration.getTime() - now.getTime() < fiveMinutes)
    try {
      const res = await axi.post("/usuarios/refresh/", {
        refresh: useAuthStore.getState().refresh,
      });
      useAuthStore.getState().setToken(res.data.access, res.data.refresh);
    } catch (err) {
        logout();
    }
  return config;
});
