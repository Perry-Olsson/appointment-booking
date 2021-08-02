import { AxiosInstance } from "axios";

export abstract class ClientInjector {
  instance: AxiosInstance;
  constructor(httpClient: AxiosInstance) {
    this.instance = httpClient;
  }
}
