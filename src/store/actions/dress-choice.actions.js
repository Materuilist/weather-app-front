import moment from "moment";
import { DRESS_CHOICE_ACTIONS, USER_ACTION_TYPES } from "../action-types";
import GarmentService from "../../services/garment-service";
import WeatherService from "../../services/weather-service";
import ForecastService from "../../services/forecast-service";
import LocationsService from "../../services/locations-service";
import { GARMENT_SEX } from "../../constants";
import { compareLocations } from "../../utils";

const garmentService = new GarmentService();
const weatherService = new WeatherService();
const forecastService = new ForecastService();
const locationsService = new LocationsService();

const setAllGraments = (garments) => ({
  type: DRESS_CHOICE_ACTIONS.SET_ALL_GARMENTS,
  allGarments: garments,
});

export const setSelectedGarments = (selectedGarments) => ({
  type: DRESS_CHOICE_ACTIONS.SET_GARMENT_SELECTION,
  selectedGarments,
});

const setAssessment = (assessment) => ({
  type: DRESS_CHOICE_ACTIONS.SET_ASSESSMENT,
  assessment,
});

const setUserLocations = (locations) => ({
  type: USER_ACTION_TYPES.SET_USER_LOCATIONS,
  locations,
});

export const getGarments = (cb) => async (dispatch, getState) => {
  const { res } = await garmentService.getAll();

  const {
    user: { sex: userSex },
  } = getState();

  const garmentsForUser = res.filter(({ sex }) =>
    userSex
      ? [GARMENT_SEX.MALE, GARMENT_SEX.UNISEX].includes(sex)
      : [GARMENT_SEX.FEMALE, GARMENT_SEX.UNISEX].includes(sex)
  );

  dispatch(setAllGraments(garmentsForUser));

  cb?.();
};

export const addToWardrobe = (garmentId, cb) => async (dispatch) => {
  await garmentService.addToWardrobe(garmentId);

  dispatch(getGarments(cb));
};

export const removeFromWardrobe = (garmentId, cb) => async (dispatch) => {
  await garmentService.removeFromWardrobe(garmentId);

  dispatch(getGarments(cb));
};

export const toggleGarmentSelection = (garment) => (dispatch, getState) => {
  const {
    dressChoice: { selectedGarments },
  } = getState();

  const isSelected = selectedGarments.some(({ id }) => id === garment.id);
  const newSelectedGarments = isSelected
    ? selectedGarments.filter(({ id }) => id !== garment.id)
    : [...selectedGarments, garment];

  dispatch(setSelectedGarments(newSelectedGarments));
};

const setWaypoints = (waypoints) => ({
  type: DRESS_CHOICE_ACTIONS.SET_WAYPOINTS,
  waypoints,
});

export const changeWaypoints = (waypoints) => (dispatch, getState) => {
  const {
    dressChoice: { waypointsData },
  } = getState();

  const newWaypointsData = waypoints.map(
    (waypoint) =>
      waypointsData.find(({ coordinates }) =>
        compareLocations(coordinates, waypoint.coordinates)
      ) || {
        ...waypoint,
        activity: 10,
        addToFavorites: false,
        naming: "",
      }
  );

  dispatch(setWaypointsData(newWaypointsData));
  dispatch(setWaypoints(waypoints));
};

export const selectFavorite =
  (latitude, longitude, naming) => (dispatch, getState) => {
    const {
      dressChoice: { waypoints, waypointsData },
    } = getState();

    const newWaypoint = {
      coordinates: [latitude, longitude],
      index: waypoints.length,
    };
    const newWaypoints = [...waypoints, newWaypoint];
    const newWaypointsData = [
      ...waypointsData.filter(
        ({ coordinates }) =>
          !compareLocations(coordinates, [latitude, longitude])
      ),
      {
        ...newWaypoint,
        activity: 10,
        addToFavorites: false,
        isAlreadyFavorite: true,
        naming,
      },
    ];

    dispatch(setWaypointsData(newWaypointsData));
    dispatch(setWaypoints(newWaypoints));
  };

export const setWaypointsData = (waypointsData) => ({
  type: DRESS_CHOICE_ACTIONS.SET_WAYPOINTS_DATA,
  waypointsData,
});

export const setLocationDataPanelVisibility = (isVisible) => ({
  type: DRESS_CHOICE_ACTIONS.SET_LOCATION_DATA_PANEL_VISIBILITY,
  isLocationDataPanelVisible: isVisible,
});

export const getWeather = (date, hour, cb) => async (dispatch, getState) => {
  const {
    dressChoice: { waypointsData, selectedGarments },
  } = getState();

  const timestamp = moment(date).add(hour, "hours").toDate();

  const forecasts = await Promise.all(
    waypointsData.map(async (waypointData) => ({
      ...waypointData,
      activity: 105 + (waypointData.activity / 100) * 105 * 6,
      forecast: await weatherService
        .getWeather(waypointData.coordinates[0], waypointData.coordinates[1])
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
        }),
    }))
  );

  const {
    res: { meanEstimation, recomendations },
  } = await forecastService.assessOutfit({
    waypointsData: forecasts,
    timestamp,
    outfit: selectedGarments.map(({ id, clo, layer, bodyPartId }) => ({
      id,
      clo,
      layer,
      bodyPartId,
    })),
  });

  dispatch(setAssessment({ meanEstimation, recomendations }));

  cb?.();
};

export const getUserLocations = (cb) => async (dispatch) => {
  const { res: userLocations } = await locationsService.getUserFavorites();

  dispatch(setUserLocations(userLocations));
};
