import { bindActionCreators } from "redux";
import * as authActions from "./auth-actions";
import * as alertsActions from "./alerts-actions";

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
  alertsActions: bindActionCreators(alertsActions, dispatch),
});

export default mapDispatchToProps;
