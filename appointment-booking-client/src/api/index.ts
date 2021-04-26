import {
  AppointmentService,
  CustomerService,
  ProviderService,
  ServiceHourService,
} from "./Api";

export const appointmentService = new AppointmentService();
export const serviceHourService = new ServiceHourService();
export const providerService = new ProviderService();
export const customerService = new CustomerService();
