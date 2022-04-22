import { DRESS_CHOICE_ACTIONS, SHARED_ACTION_TYPES } from "../action-types";

const initialState = {
  selectedGarments: [],
  allGarments: [],
};

const dressChoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRESS_CHOICE_ACTIONS.SET_ALL_GARMENTS:
      return { ...state, allGarments: action.allGarments };
    case DRESS_CHOICE_ACTIONS.SET_GARMENT_SELECTION:
      return { ...state, selectedGarments: action.selectedGarments };
    case SHARED_ACTION_TYPES.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default dressChoiceReducer;
