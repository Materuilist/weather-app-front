import BaseService from "./base-service";

class ForecastService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "forecast/";
  }

  assessOutfit(body) {
    return this.request("assess-outfit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
}

export default ForecastService;
