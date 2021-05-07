import { AxiosInstance } from "axios";
import { Appointment, NewAppointment, RawAppointment } from "../../types";
import { ClientInjector } from "../ClientInjector";
import { appointmentParser } from "../utils";

export class AppointmentService extends ClientInjector {
  public constructor(httpClient: AxiosInstance) {
    super(httpClient);
  }

  public async createAppointment(newAppointment: NewAppointment) {
    const response = await this.instance.post("/appointments", newAppointment);

    return response;
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
