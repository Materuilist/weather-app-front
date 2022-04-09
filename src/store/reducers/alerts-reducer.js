import { ALERTS_ACTION_TYPES } from "../action-types";

const initialState = [];

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERTS_ACTION_TYPES.SET_ALERTS:
      return action.alerts;
    default:
      return state;
  }
};

export default alertsReducer;
