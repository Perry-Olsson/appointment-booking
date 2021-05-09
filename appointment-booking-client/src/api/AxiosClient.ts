import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { accessToken } from "../pages/_app";
import { refreshToken } from "./utils/refreshToken";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const initializeAxios = () => {
  const client = axios.create({
    baseURL:
      `${process.env.NEXT_PUBLIC_API_URI}` || "http://localhost:3000/api",
    withCredentials: true,
    validateStatus: status => status < 500,
  });

  _initializeRequestIntercepter(client);
  _initializeResponseInterceptor(client);

  return client;
};

const _initializeRequestIntercepter = (client: AxiosInstance) => {
  client.interceptors.request.use(_handleAuth, _handleError);
};

const _initializeResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(_handleResponse, _handleError);
};

const _handleResponse = ({ data }: AxiosResponse) => data;
const _handleError = (error: any) => Promise.reject(error);

const _handleAuth = async (config: AxiosRequestConfig) => {
  console.log(config);
  if (_isAuthenticating(config)) return config;

  if (accessToken.get() && accessToken.isValid()) {
    console.log("valid access token hit");
    config.headers["authorization"] = `Bearer ${accessToken.get()}`;
    return config;
  }

  await refreshToken();
  config.headers["authorization"] = `Bearer ${accessToken.get()}`;
  return config;
};

const _isAuthenticating = (config: AxiosRequestConfig) =>
  config.url === "/customers/refreshToken" || config.url === "/customers/login";

export const httpClient = initializeAxios();
