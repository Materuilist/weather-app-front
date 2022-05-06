import { ALERT_VISIBILITY_TIME } from "../../constants";
import { ALERTS_ACTION_TYPES } from "../action-types";

const setAlerts = (alerts) => ({
  type: ALERTS_ACTION_TYPES.SET_ALERTS,
  alerts,
});

export const showAlert = (text, type) => (dispatch, getState) => {
  const previousAlerts = getState().alerts;
  const suchAlertExists = previousAlerts.some((alert) => alert.text === text);

  if (suchAlertExists) {
    return;
  }

  const newAlertId =
    previousAlerts.reduce((maxId, { id }) => (id > maxId ? id : maxId), 0) + 1;

  const dismissAlertTimeout = setTimeout(() => {
    dispatch(dismissAlert(newAlertId));
  }, ALERT_VISIBILITY_TIME);

  const newAlerts = [
    ...previousAlerts,
    { text, type, id: newAlertId, dismissAlertTimeout },
  ];
  dispatch(setAlerts(newAlerts));
};

export const dismissAlert = (alertId) => (dispatch, getState) => {
  const alert = getState().alerts.find(({ id }) => id === alertId);

  if (alert) {
    clearTimeout(alert.dismissAlertTimeout);

    dispatch(setAlerts(getState().alerts.filter(({ id }) => id !== alertId)));
  }
};
