import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "../pages/_app";

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

const _initializeResponseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(_handleResponse, _handleError);
};

const _handleResponse = ({ data }: AxiosResponse) => data;
const _handleError = (error: any) => Promise.reject(error);

const _initializeRequestIntercepter = (client: AxiosInstance) => {
  client.interceptors.request.use(async config => {
    if (config.url !== "/customers/refreshToken") {
      if (auth.getAccessToken()) {
        config.headers["authorization"] = `Bearer ${auth.getAccessToken()}`;
      } else {
        const response = await client.post("/customers/refreshToken");
        if (response.accessToken) {
          auth.setAccessToken(response.accessToken);
          config.headers["authorization"] = `Bearer ${auth.getAccessToken()}`;
        }
      }
    }
    return config;
  }, _handleError);
};

export const httpClient = initializeAxios();
