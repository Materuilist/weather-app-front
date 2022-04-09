import { USER_ACTION_TYPES } from "../action-types";

const initialState = {
  login: null,
  role: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.SET_USER:
      return { ...state, login: action.login, role: action.role };
    default:
      return state;
  }
};

export default userReducer;
