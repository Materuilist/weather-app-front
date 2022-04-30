import moment from "moment";
import { STATISTICS_RADIUS_KM } from "../../constants";
import StatisticsService from "../../services/statistics-service";
import WeatherService from "../../services/weather-service";
import { STATISTICS_ACTIONS } from "../action-types";

const statisticsService = new StatisticsService();
const weatherService = new WeatherService();

export const setWaypoint = (waypoint) => ({
  type: STATISTICS_ACTIONS.SET_WAYPOINT,
  waypoint,
});

export const setData = (data) => ({
  type: STATISTICS_ACTIONS.SET_DATA,
  data,
});

export const getTodayStatistics = (hour, cb) => async (dispatch, getState) => {
  const timestamp = moment().set("hours", hour).toDate();
  const {
    statistics: {
      waypoint: { coordinates },
    },
  } = getState();

  const { res: statistics } = await statisticsService.getToday({
    timestamp,
    coordinates,
    radius: STATISTICS_RADIUS_KM,
  });

  dispatch(setData(statistics?.mostPopularOutfit ? statistics : null));

  cb?.();
};

export const getAllTimeStatistics =
  (date, hour, cb) => async (dispatch, getState) => {
    const {
      statistics: {
        waypoint: { coordinates },
      },
    } = getState();

    const { temp, windSpeed } = await weatherService
      .getWeather(coordinates[0], coordinates[1])
      .then((forecast) => {
        const neededForecast = forecast.hourly.find(({ dt }) => {
          const forecastDate = new Date(dt * 1000);

          return (
            forecastDate.getDate() === date.getDate() &&
            forecastDate.getHours() === hour
          );
        });

        return {
          temp: neededForecast.feels_like,
          windSpeed: neededForecast.wind_speed,
        };
      });

    const { res: statistics } = await statisticsService.getAllTime({
      coordinates,
      radius: STATISTICS_RADIUS_KM,
      temp,
      windSpeed,
    });

    dispatch(setData(statistics?.mostPopularOutfit ? statistics : null));

    cb?.();
  };

export const getRecomendation =
  (date, hour, cb) => async (dispatch, getState) => {
    const {
      statistics: {
        waypoint: { coordinates },
      },
    } = getState();

    const { temp, windSpeed } = await weatherService
      .getWeather(coordinates[0], coordinates[1])
      .then((forecast) => {
        const neededForecast = forecast.hourly.find(({ dt }) => {
          const forecastDate = new Date(dt * 1000);

          return (
            forecastDate.getDate() === date.getDate() &&
            forecastDate.getHours() === hour
          );
        });

        return {
          temp: neededForecast.feels_like,
          windSpeed: neededForecast.wind_speed,
        };
      });

    const { res: statistics } = await statisticsService.getRecomendation({
      coordinates,
      temp,
      windSpeed,
    });

    dispatch(
      setData(
        statistics?.fittingOutfits
          ? {
              outfits: statistics.fittingOutfits,
              recommendedOutfit: statistics.recommendedOutfit,
            }
          : null
      )
    );

    cb?.();
  };
