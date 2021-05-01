import _cors from "cors";

export const cors = () => {
  return _cors({
    credentials: true,
    origin: function (_origin, callback) {
      callback(null, true);
    },
  });
};
