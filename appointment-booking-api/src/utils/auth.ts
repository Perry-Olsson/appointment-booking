import jwt from "jsonwebtoken";
import config from "../config";

class Auth {
  public createToken(email: string) {
    return jwt.sign({ email }, config.jwtSecret);
  }

  public decodeToken(token: string) {
    const decodedToken = jwt.verify(token, config.jwtSecret) as DecodedToken;

    return decodedToken;
  }
}

export interface DecodedToken {
  email: string;
  iat: number;
}

export const auth = new Auth();
