import {
  RESPONSE_STATUSES,
  ROUTES_URLS,
  USER_TOKEN_KEY,
} from "../../constants";
import AuthService from "../../services/auth-service";
import { USER_ACTION_TYPES } from "../action-types";
import { history } from "../index";

const authService = new AuthService();

const setUser = (login, role, sex) => ({
  type: USER_ACTION_TYPES.SET_USER,
  login,
  role,
  sex,
});

export const getUser = (cb) => async (dispatch, getState) => {
  const { res, status } = await authService.getUser();

  if (status === RESPONSE_STATUSES.SUCCESS) {
    const {
      userInfo: { login, role, sex },
    } = res;

    dispatch(setUser(login, role, sex));
  } else {
    history.push(ROUTES_URLS.LOGIN);
  }

  cb?.();
};

export const authorize =
  (isRegister, login, password, sex, cb) => async (dispatch, getState) => {
    const { res, status } = await authService[
      isRegister ? "register" : "login"
    ](login, password, sex);

    if (status === RESPONSE_STATUSES.SUCCESS) {
      localStorage.setItem(USER_TOKEN_KEY, res.token);

      dispatch(
        getUser(() => {
          cb?.();
          history.push("/");
        })
      );
    } else {
      cb?.();
    }
  };
