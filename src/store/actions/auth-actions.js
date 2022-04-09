import { RESPONSE_STATUSES, ROUTES_URLS } from "../../constants";
import AuthService from "../../services/auth-service";
import { USER_ACTION_TYPES } from "../action-types";
import { history } from "../index";

const authService = new AuthService();

const setUser = (login, role) => ({
  type: USER_ACTION_TYPES.SET_USER,
  login,
  role,
});

export const getUser = (cb) => async (state, dispatch) => {
  const { res, status } = await authService.getUser();

  if (status === RESPONSE_STATUSES.SUCCESS) {
    const {
      userInfo: { login, role },
    } = res;

    dispatch(setUser(login, role));
  } else {
    history.push(ROUTES_URLS.LOGIN);
  }

  cb?.();
};
