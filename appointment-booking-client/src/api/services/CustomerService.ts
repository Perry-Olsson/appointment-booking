import { AxiosInstance } from "axios";
import { accessToken } from "../../pages/_app";
import { User } from "../../types";
import { ClientInjector } from "../ClientInjector";

export class CustomerService extends ClientInjector {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async login(credentials: Credentials) {
    const response = await this.instance.post("/customers/login", credentials);

    return response;
  }

  public async logout() {
    await this.instance.post("/customers/logout");
  }

  public async user() {
    const response = await this.instance.get<User | "Unauthorized">(
      "/customers/user"
    );

    return response;
  }

  public async refreshToken() {
    const response = await this.instance.post("/customers/refreshToken");

    if (response.accessToken) accessToken.set(response.accessToken);
    return response;
  }
}

interface Credentials {
  email: string;
  password: string;
}
