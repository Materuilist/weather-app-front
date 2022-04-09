import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import userReducer from "./user-reducer";

const reducers = {
  user: userReducer,
};

export const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
  });
