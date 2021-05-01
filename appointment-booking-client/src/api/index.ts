import {
  AppointmentService,
  CustomerService,
  ProviderService,
  ServiceHourService,
} from "./Api";
import { httpClient } from "./AxiosClient";

export const appointmentService = new AppointmentService(httpClient);
export const serviceHourService = new ServiceHourService(httpClient);
export const providerService = new ProviderService(httpClient);
export const customerService = new CustomerService(httpClient);
