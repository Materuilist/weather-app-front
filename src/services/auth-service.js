import BaseService from "./base-service";

class AuthService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "auth/";
  }

  getUser() {
    return this.request("get-user");
  }

  login(login, password) {
    return this.request("sign-in", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  register(login, password, sex) {
    return this.request("sign-up", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        sex,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default AuthService;
