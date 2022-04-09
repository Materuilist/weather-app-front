import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user-reducer";
import alertsReducer from "./alerts-reducer";

const reducers = {
  user: userReducer,

  alerts: alertsReducer,
};

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
