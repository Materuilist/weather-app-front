import BaseService from "./base-service";

class StatisticsService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "statistics/";
  }

  getToday(body) {
    return this.request("get-today", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  
  getAllTime(body) {
    return this.request("get-all-time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}

export default StatisticsService;
