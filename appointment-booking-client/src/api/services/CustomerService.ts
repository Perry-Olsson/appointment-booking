import { AxiosInstance } from "axios";
import { RegisterFormValues } from "../../app/Register";
import { accessToken } from "../../pages/_app";
import { User, UserAppointment } from "../../types";
import { ClientInjector } from "../ClientInjector";

export class CustomerService extends ClientInjector {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async register(input: RegisterFormValues) {
    const response = await this.instance.post("/customers", {
      ...input,
      type: "USER",
    });

    return response;
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

  public async pastAppointments() {
    const response = await this.instance.get<
      UserAppointment[] | "Unauthorized"
    >("/customers/pastAppointments");
    return response;
  }
}

interface Credentials {
  email: string;
  password: string;
}
