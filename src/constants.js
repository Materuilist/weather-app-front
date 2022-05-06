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
  ERROR: "danger",
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

export const BODY_PARTS_NAMES = {
  1: "Head",
  2: "Body",
  3: "Leg",
  4: "Neck",
  5: "Foot",
  6: "Hand",
};

export const BODY_PARTS_IDS = Object.values(BODY_PARTS);
export const LEFT_BODY_PARTS = BODY_PARTS_IDS.slice(
  0,
  BODY_PARTS_IDS.length / 2
);
export const RIGHT_BODY_PARTS = BODY_PARTS_IDS.slice(BODY_PARTS_IDS.length / 2);

export const GARMENT_SEX = {
  MALE: 1,
  FEMALE: 2,
  UNISEX: 3,
};

export const STATISTICS_RADIUS_KM = 25;

export const PERM_LOCATION = [58.02701789270559, 56.02106965962186];
