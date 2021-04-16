import { Appointment, RawAppointment, RawProvider, ServiceDay } from "../types";
import { AxiosClient } from "./AxiosClient";
import { AppointmentParser } from "./utils";

const appointmentParser = new AppointmentParser();

export class AppointmentService extends AxiosClient {
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URI || "http://localhost:3001/api");
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

export class ServiceHourService extends AxiosClient {
  constructor() {
    super(
      `${process.env.NEXT_PUBLIC_API_URI}/serviceHours` ||
        "http://localhost:3001/api/serviceHours"
    );
  }

  public async fetchServiceHours() {
    return await this.instance.get<ServiceDay[]>("/");
  }
}

export class ProviderService extends AxiosClient {
  constructor() {
    super(
      `${process.env.NEXT_PUBLIC_API_URI}/providers` ||
        "http://localhost:3001/api/providers"
    );
  }

  public async fetchProviders() {
    const providers = await this.instance.get<RawProvider[]>("/");

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
