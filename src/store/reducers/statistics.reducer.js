import { SHARED_ACTION_TYPES, STATISTICS_ACTIONS } from "../action-types";

const initialState = {
  waypoint: null,
  data: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATISTICS_ACTIONS.SET_WAYPOINT:
      return { ...state, waypoint: action.waypoint };
    case STATISTICS_ACTIONS.SET_DATA:
      return { ...state, data: action.data };
    case SHARED_ACTION_TYPES.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default statisticsReducer;
