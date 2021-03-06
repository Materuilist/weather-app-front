import { SHARED_ACTION_TYPES, USER_ACTION_TYPES } from "../action-types";

const initialState = {
  login: null,
  role: null,
  sex: null,
  locations: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USER:
      return {
        ...state,
        login: action.login,
        role: action.role,
        sex: action.sex,
      };
    case USER_ACTION_TYPES.SET_USER_LOCATIONS:
      return { ...state, locations: action.locations };
    case SHARED_ACTION_TYPES.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
