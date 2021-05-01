import { AxiosInstance } from "axios";
import { User } from "../app/App";
import { Appointment, RawAppointment, RawProvider, ServiceDay } from "../types";
import { AppointmentParser } from "./utils";

const appointmentParser = new AppointmentParser();

abstract class ClientInjection {
  instance: AxiosInstance;
  constructor(httpClient: AxiosInstance) {
    this.instance = httpClient;
  }
}

export class AppointmentService extends ClientInjection {
  public constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async fetchAppointments(query: string): Promise<Appointment[]> {
    const rawAppointments = await this.instance.get<RawAppointment[]>(
      `/appointments/${query}`
    );

    return appointmentParser.mapTimestamps(rawAppointments);
  }

  public prefetchAppointments = async () => {
    const rawAppointments = await this.instance.get<RawAppointment[]>(
      "/appointments/"
    );
    return appointmentParser.indexAppointments(rawAppointments);
  };
}

export class ServiceHourService extends ClientInjection {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async fetchServiceHours() {
    return await this.instance.get<ServiceDay[]>("/serviceHours");
  }
}

export class ProviderService extends ClientInjection {
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

export class CustomerService extends ClientInjection {
  constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async login(credentials: Credentials) {
    const response = await this.instance.post("/customers/login", credentials);

    return response;
  }

  public async user() {
    const response = await this.instance.get<User | "Unauthorized">(
      "/customers/user"
    );

    return response;
  }
}

interface Credentials {
  email: string;
  password: string;
}
