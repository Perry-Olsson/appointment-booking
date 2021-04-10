export interface Appointment {
  id: number;
  createdAt: string;
  updatedAt: string;
  timestamp: Date;
  end: Date;
}

export interface RawAppointment {
  id: number;
  createdAt: string;
  updatedAt: string;
  timestamp: string;
  end: string;
}

export interface OrganizedAppointments {
  [index: number]: DayIndex;
}

interface DayIndex {
  [index: number]: Appointment[];
}

export interface ServiceDay {
  day: number;
  open: string;
  close: string;
  isClosed: boolean;
}
