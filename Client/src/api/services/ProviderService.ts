import { AxiosInstance } from "axios";
import { RawProvider } from "../../types";
import { ClientInjector } from "../ClientInjector";
import { appointmentParser } from "../utils";

export class ProviderService extends ClientInjector {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async fetchProviders() {
    const providers = await this.instance.get<RawProvider[]>("/providers");

    return providers.map(provider => {
      return {
        ...provider,
        appointments: appointmentParser.indexAppointments(
          provider.appointments
        ),
      };
    });
  }
}
