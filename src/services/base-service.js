import { RESPONSE_STATUSES, USER_TOKEN_KEY } from "../constants";

class BaseService {
  baseUrl = "http://localhost:8000/api/";

  async request(url, options, responseFormat = "json") {
    const res = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        ...options?.headers,
        AUTHORIZATION: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`,
      },
    });

    const resBody = await res[responseFormat]();

    switch (res.status) {
      case 200:
      case 201:
        return {
          status: RESPONSE_STATUSES.SUCCESS,
          res: resBody,
        };
      case 401:
        return {
          status: RESPONSE_STATUSES.AUTH_FAILED,
          res: resBody,
        };
      case 400:
      case 402:
      case 403:
      case 404:
        return {
          status: RESPONSE_STATUSES.FRONTEND_ERROR,
          res: resBody,
        };
      case 500:
      case 501:
        return {
          status: RESPONSE_STATUSES.BACKEND_ERROR,
          res: resBody,
        };
      default:
        return null;
    }
  }
}

export default BaseService;
