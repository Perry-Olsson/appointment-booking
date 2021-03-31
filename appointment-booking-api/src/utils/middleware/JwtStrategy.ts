import passportJwt from "passport-jwt";
import config from "../../config";
import { customer } from "../../repositories";

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
      const _customer = await customer.findUnique({
        where: { email: jwt_payload.email },
      });

      if (_customer && _customer.type === "USER") return done(null, _customer);
      else return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);
