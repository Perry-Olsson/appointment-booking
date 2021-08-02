import cors from "cors";

export const myCors = () => {
  return cors({
    credentials: true,
  });
};
