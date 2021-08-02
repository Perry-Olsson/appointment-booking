import { customerService } from "..";

export const refreshToken = async () => {
  return await customerService.refreshToken();
};
