import { ONE_MINUTE, TZ_OFFSET } from "../constants";
import {
  Appointment,
  OrganizedAppointments,
  RawAppointment,
  ServiceDay,
} from "../types";
import { AxiosClient } from "./AxiosClient";

export class AppointmentService extends AxiosClient {
  public constructor() {
    super(process.env.NEXT_PUBLIC_API_URI || "http://localhost:3001/api");
  }

  public async fetchAppointments(query: string): Promise<Appointment[]> {
    const rawAppointments = await this.instance.get<RawAppointment[]>(
      `/appointments/${query}`
    );

    return this._mapTimestamps(rawAppointments);
  }

  private _mapTimestamps(rawAppointments: RawAppointment[]): Appointment[] {
    return rawAppointments.map(a => {
      return this._parseRawAppointment(a);
    });
  }

  public prefetchAppointments = async () => {
    const rawAppointments = await this.instance.get<RawAppointment[]>(
      "/appointments/"
    );
    return this._indexAppointments(rawAppointments);
  };

  private _indexAppointments(rawAppointments: RawAppointment[]) {
    const organizedAppointments: OrganizedAppointments = {};
    rawAppointments.forEach(a => {
      const parsedAppointment = this._parseRawAppointment(a);

      const month = parsedAppointment.timestamp.getMonth();
      const date = parsedAppointment.timestamp.getDate();

      if (!organizedAppointments[month]) organizedAppointments[month] = {};
      if (!organizedAppointments[month][date])
        organizedAppointments[month][date] = [];

      organizedAppointments[month][date].push(parsedAppointment);
    });
    return organizedAppointments;
  }

  private _parseRawAppointment(appointment: RawAppointment) {
    const timestamp = this._convertToPacificTz(appointment.timestamp);
    const end = this._convertToPacificTz(appointment.end);

    return { ...appointment, timestamp, end } as Appointment;
  }

  private _convertToPacificTz(timestamp: string): Date {
    const localTimestamp = new Date(timestamp);
    return new Date(
      localTimestamp.valueOf() -
        (TZ_OFFSET - localTimestamp.getTimezoneOffset() * ONE_MINUTE)
    );
  }
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
