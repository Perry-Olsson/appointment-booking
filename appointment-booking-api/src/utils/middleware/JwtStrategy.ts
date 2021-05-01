import passportJwt from "passport-jwt";
import config from "../../config";
import { prisma } from "../../prisma";
import { defaultCustomerSelect } from "../../repositories/constants";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.accessTokenSecret,
};

export const jwtStrategy = new JwtStrategy(
  options,
  async function (jwt_payload, done) {
    try {
      const customer = await prisma.customer.findUnique({
        where: { email: jwt_payload.email },
        select: defaultCustomerSelect,
      });

      if (customer && customer.type === "USER") return done(null, customer);
      else done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);
