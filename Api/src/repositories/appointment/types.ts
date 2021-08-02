export interface ExposedAppointment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  timestamp: Date;
  end: Date;
}

export interface TimeBoundry {
  hasQueryString: boolean;
  start: number;
  end: number;
}
