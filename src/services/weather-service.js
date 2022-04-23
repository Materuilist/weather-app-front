class WeatherService {
  constructor() {
    this.baseUrl =
      "https://api.openweathermap.org/data/2.5/onecall?appid=1b2722bf8c2ac12bf0b39341c2b49c82&units=metric";
  }

  getWeather(latitude, longitude) {
    return fetch(`${this.baseUrl}&lat=${latitude}&lon=${longitude}`).then(
      (res) => res.json()
    );
  }
}

export default WeatherService;
