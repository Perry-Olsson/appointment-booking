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

export interface Provider {
  bio: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  schedule: Schedule;
  procedures: Procedure[];
}

export interface Procedure {
  name: string;
  description: string;
  duration: number;
}

export interface Schedule {
  Sunday: string[];
  Monday: string[];
  Tuesday: string[];
  Wednesday: string[];
  Thursday: string[];
  Friday: string[];
  Saturday: string[];
  id: number;
  providerId: string;
}
