export interface Appointment {
  id: number;
  createdAt: string;
  updatedAt: string;
  timestamp: Date;
  end: Date;
}

export interface OrganizedAppointments {
  [index: number]: DayIndex;
}

interface DayIndex {
  [index: number]: Appointment[];
}
