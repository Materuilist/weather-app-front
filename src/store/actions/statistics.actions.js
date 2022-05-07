import moment from "moment";
import { ALERT_TYPES, STATISTICS_RADIUS_KM } from "../../constants";
import StatisticsService from "../../services/statistics-service";
import WeatherService from "../../services/weather-service";
import { STATISTICS_ACTIONS } from "../action-types";
import * as alertsActions from "./alerts.actions";

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

export const getTodayStatistics =
  (hour, radius, cb) => async (dispatch, getState) => {
    const timestamp = moment().set("hours", hour).toDate();
    const {
      statistics: {
        waypoint: { coordinates },
      },
    } = getState();

    const { res: statistics } = await statisticsService.getToday({
      timestamp,
      coordinates,
      radius,
    });

    dispatch(setData(statistics?.mostPopularOutfit ? statistics : null));
    if (!statistics?.mostPopularOutfit) {
      dispatch(
        alertsActions.showAlert("No statistics yet!", ALERT_TYPES.ERROR)
      );
    }

    cb?.();
  };

export const getAllTimeStatistics =
  (date, hour, radius, cb) => async (dispatch, getState) => {
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
      radius,
      temp,
      windSpeed,
    });

    dispatch(setData(statistics?.mostPopularOutfit ? statistics : null));
    if (!statistics?.mostPopularOutfit) {
      dispatch(
        alertsActions.showAlert("No statistics yet!", ALERT_TYPES.ERROR)
      );
    }

    cb?.();
  };

export const getRecomendation =
  (date, hour, activity, cb) => async (dispatch, getState) => {
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
      activity: 105 + (activity / 100) * 105 * 6,
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
