import cors from "cors";

export const myCors = () => {
  return cors({
    credentials: true,
    origin: function (_origin, callback) {
      callback(null, true);
    },
  });
};
