import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user-reducer";
import alertsReducer from "./alerts-reducer";
import dressChoiceReducer from "./dress-choice.reducer";

const reducers = {
  user: userReducer,
  dressChoice: dressChoiceReducer,

  alerts: alertsReducer,
};

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
