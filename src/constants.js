export const ROUTES_URLS = {
  LOGIN: "/login",
  REGISTER: "/register",
  DESIGN: "/design",
  CLOTHES_CHOICE: "/clothes-choice",
};

export const CLOTHES_CHOICE_ROUTES = {
  DRESS: ROUTES_URLS.CLOTHES_CHOICE + "/",
  STATISTICS: ROUTES_URLS.CLOTHES_CHOICE + "/statistics",
};

export const STATISTICS_TYPES = {
  TODAY: 1,
  USUALLY: 2,
  FORECAST: 3,
};

export const STATISTICS_NAMES = {
  [STATISTICS_TYPES.TODAY]: "В чем ходят сегодня",
  [STATISTICS_TYPES.USUALLY]: "В чем обычно ходят в такую погоду",
  [STATISTICS_TYPES.FORECAST]: "Прогноз системы",
};

export const ROLES = {
  DESIGNER: 1,
  DEFAULT: 2,
};

export const USER_TOKEN_KEY = "WEATHER_APP_USER_TOKEN";

export const RESPONSE_STATUSES = {
  SUCCESS: "SUCCESS",
  AUTH_FAILED: "AUTH_FAILED",
  BACKEND_ERROR: "BACKEND_ERROR",
  FRONTEND_ERROR: "FRONTEND_ERROR",
};

export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

export const ALERT_VISIBILITY_TIME = 5000;

export const DEFAULT_ERROR_MESSAGE = "An error happened. Sorry...";

export const BODY_PARTS = {
  HEAD: 1,
  BODY: 2,
  LEG: 3,
  NECK: 4,
  FOOT: 5,
  HAND: 6,
};

export const GARMENT_SEX = {
  MALE: 1,
  FEMALE: 2,
  UNISEX: 3,
};
