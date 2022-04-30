import BaseService from "./base-service";

class LocationsService extends BaseService {
  constructor() {
    super();

    this.baseUrl = this.baseUrl + "locations/";
  }

  getUserFavorites() {
    return this.request("get-user-favourites");
  }
}

export default LocationsService;
