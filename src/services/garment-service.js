import BaseService from "./base-service";

class GarmentService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "garment/";
  }

  getAll() {
    return this.request("get-all");
  }

  addGarment({ naming, imageData, saveData, clo, layer, sex, bodyPartId }) {
    return this.request("add", {
      method: "POST",
      body: JSON.stringify({
        naming,
        imageData,
        saveData,
        clo,
        layer,
        sex,
        bodyPartId,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default GarmentService;
