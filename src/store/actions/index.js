import { bindActionCreators } from "redux";

import * as authActions from "./auth.actions";
import * as alertsActions from "./alerts.actions";
import * as sharedActions from "./shared.actions";
import * as dressChoiceActions from "./dress-choice.actions";

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  alertsActions: bindActionCreators(alertsActions, dispatch),
  dressChoiceActions: bindActionCreators(dressChoiceActions, dispatch),

  sharedActions: bindActionCreators(sharedActions, dispatch),
});

export default mapDispatchToProps;
