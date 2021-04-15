import passportJwt from "passport-jwt";
import config from "../../config";
import { prisma } from "../../prisma";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export const jwtStrategy = new JwtStrategy(
  options,
  async function (jwt_payload, done) {
    try {
      const customer = await prisma.customer.findUnique({
        where: { email: jwt_payload.email },
      });

      if (customer && customer.type === "USER") return done(null, customer);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);
