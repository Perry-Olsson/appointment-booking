import jwtDecode from "jwt-decode";

export class AccessToken {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  set(token: string) {
    this.accessToken = token;
  }

  get() {
    return this.accessToken;
  }

  clear() {
    this.accessToken = "";
  }

  isValid() {
    try {
      const token = jwtDecode<{ email: string; iat: number; exp: number }>(
        this.accessToken
      );

      if (Date.now() >= token.exp * 1000) return false;

      return true;
    } catch (e) {
      return false;
    }
  }
}
