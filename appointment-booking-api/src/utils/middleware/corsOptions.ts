import cors from "cors";

export default function () {
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (origin) callback(null, true);
      else callback(new Error("Not allowed by cors"));
    },
  });
}
