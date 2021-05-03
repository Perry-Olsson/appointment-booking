//prisma query options
export const exposedAppointmentFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
  end: true,
};

export const defaultCustomerSelect = {
  id: true,
  email: true,
  phoneNumber: true,
  type: true,
  firstName: true,
  lastName: true,
};

export const refreshTokenCustomerSelect = {
  ...defaultCustomerSelect,
  tokenVersion: true,
};
