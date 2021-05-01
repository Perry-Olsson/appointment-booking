import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "../pages/_app";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class AxiosClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      validateStatus: status => status < 500,
    });

    this._initializeRequestIntercepter();
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  }

  private _handleResponse = ({ data }: AxiosResponse) => data;
  private _handleError = (error: any) => Promise.reject(error);

  private _initializeRequestIntercepter() {
    this.instance.interceptors.request.use(async config => {
      console.log(auth.getAccessToken());
      if (auth.getAccessToken()) {
        config.headers["authorization"] = `Bearer ${auth.getAccessToken()}`;
      } else {
        // if (response.accessToken) {
        //   auth.setAccessToken(response.accessToken);
        //   config.headers["authorization"] = `Bearer ${auth.getAccessToken()}`;
        // }
      }
      return config;
    }, this._handleError);
  }
}
