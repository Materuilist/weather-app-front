import BaseService from "./base-service";

class AuthService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "auth/";
  }

  getUser() {
    return this.request("get-user");
  }
}

export default AuthService;
