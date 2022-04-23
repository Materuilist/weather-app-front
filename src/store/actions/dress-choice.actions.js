import { DRESS_CHOICE_ACTIONS } from "../action-types";
import GarmentService from "../../services/garment-service";
import { GARMENT_SEX } from "../../constants";
import { compareLocations } from "../../utils";

const garmentService = new GarmentService();

const setAllGraments = (garments) => ({
  type: DRESS_CHOICE_ACTIONS.SET_ALL_GARMENTS,
  allGarments: garments,
});

const setSelectedGarments = (selectedGarments) => ({
  type: DRESS_CHOICE_ACTIONS.SET_GARMENT_SELECTION,
  selectedGarments,
});

export const getGarments = (cb) => async (dispatch, getState) => {
  const { res } = await garmentService.getAll();

  const {
    user: { sex: userSex },
  } = getState();

  const garmentsForUser = res.filter(({ sex }) =>
    userSex
      ? [GARMENT_SEX.MALE, GARMENT_SEX.UNISEX].includes(sex)
      : [GARMENT_SEX.FEMALE, GARMENT_SEX.UNISEX].includes(sex)
  );

  dispatch(setAllGraments(garmentsForUser));

  cb?.();
};

export const addToWardrobe = (garmentId, cb) => async (dispatch) => {
  await garmentService.addToWardrobe(garmentId);

  dispatch(getGarments(cb));
};

export const removeFromWardrobe = (garmentId, cb) => async (dispatch) => {
  await garmentService.removeFromWardrobe(garmentId);

  dispatch(getGarments(cb));
};

export const toggleGarmentSelection = (garment) => (dispatch, getState) => {
  const {
    dressChoice: { selectedGarments },
  } = getState();

  const isSelected = selectedGarments.some(({ id }) => id === garment.id);
  const newSelectedGarments = isSelected
    ? selectedGarments.filter(({ id }) => id !== garment.id)
    : [...selectedGarments, garment];

  dispatch(setSelectedGarments(newSelectedGarments));
};

const setWaypoints = (waypoints) => ({
  type: DRESS_CHOICE_ACTIONS.SET_WAYPOINTS,
  waypoints,
});

export const changeWaypoints = (waypoints) => (dispatch, getState) => {
  const {
    dressChoice: { waypointsData },
  } = getState();

  const newWaypointsData = waypoints.map(
    (waypoint) =>
      waypointsData.find(({ coordinates }) =>
        compareLocations(coordinates, waypoint.coordinates)
      ) || {
        ...waypoint,
        activity: 0,
        addToFavorites: false,
        naming: "",
      }
  );

  dispatch(setWaypointsData(newWaypointsData));
  dispatch(setWaypoints(waypoints));
};

export const setWaypointsData = (waypointsData) => ({
  type: DRESS_CHOICE_ACTIONS.SET_WAYPOINTS_DATA,
  waypointsData,
});

export const setLocationDataPanelVisibility = (isVisible) => ({
  type: DRESS_CHOICE_ACTIONS.SET_LOCATION_DATA_PANEL_VISIBILITY,
  isLocationDataPanelVisible: isVisible,
});
