import { AxiosInstance } from "axios";
import { ServiceDay } from "../../types";
import { ClientInjector } from "../ClientInjector";

export class ServiceHourService extends ClientInjector {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async fetchServiceHours() {
    return await this.instance.get<ServiceDay[]>("/serviceHours");
  }
}
