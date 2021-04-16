import { TZ_OFFSET, ONE_MINUTE } from "../../constants";
import {
  RawAppointment,
  OrganizedAppointments,
  Appointment,
} from "../../types";

export class AppointmentParser {
  public indexAppointments(rawAppointments: RawAppointment[]) {
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

  public mapTimestamps(rawAppointments: RawAppointment[]): Appointment[] {
    return rawAppointments.map(a => {
      return this._parseRawAppointment(a);
    });
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
