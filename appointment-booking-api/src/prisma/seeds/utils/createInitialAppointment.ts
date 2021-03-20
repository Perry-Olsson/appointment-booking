export const createInitialAppointment = (date: Date = new Date()) => {
  date.setHours(9);

  const initialAppointmentTimestamp = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours()
  );

  return initialAppointmentTimestamp.valueOf();
};
