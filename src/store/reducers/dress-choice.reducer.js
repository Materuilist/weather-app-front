import { DRESS_CHOICE_ACTIONS, SHARED_ACTION_TYPES } from "../action-types";

const initialState = {
  selectedGarments: [],
  allGarments: [],
  waypoints: [],
  waypointsData: [],
  assessment: null,
  isLocationDataPanelVisible: false,
};

const dressChoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRESS_CHOICE_ACTIONS.SET_ALL_GARMENTS:
      return { ...state, allGarments: action.allGarments };
    case DRESS_CHOICE_ACTIONS.SET_GARMENT_SELECTION:
      return { ...state, selectedGarments: action.selectedGarments };
    case DRESS_CHOICE_ACTIONS.SET_WAYPOINTS:
      return { ...state, waypoints: action.waypoints };
    case DRESS_CHOICE_ACTIONS.SET_WAYPOINTS_DATA:
      return { ...state, waypointsData: action.waypointsData };
    case DRESS_CHOICE_ACTIONS.SET_ASSESSMENT:
      return { ...state, assessment: action.assessment };
    case DRESS_CHOICE_ACTIONS.SET_LOCATION_DATA_PANEL_VISIBILITY:
      return {
        ...state,
        isLocationDataPanelVisible: action.isLocationDataPanelVisible,
      };
    case SHARED_ACTION_TYPES.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};

export default dressChoiceReducer;
