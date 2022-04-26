import moment from "moment";
import { STATISTICS_RADIUS_KM } from "../../constants";
import StatisticsService from "../../services/statistics-service";
import { STATISTICS_ACTIONS } from "../action-types";

const statisticsService = new StatisticsService();

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
