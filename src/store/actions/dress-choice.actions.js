import { DRESS_CHOICE_ACTIONS } from "../action-types";
import GarmentService from "../../services/garment-service";
import { GARMENT_SEX } from "../../constants";

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
