import _cors from "cors";

export const cors = () => {
  return _cors({
    credentials: true,
    origin: function (origin, callback) {
      if (origin) callback(null, true);
      else callback(new Error("Not allowed by cors"));
    },
  });
};
