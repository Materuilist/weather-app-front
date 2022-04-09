import { bindActionCreators } from "redux";
import * as authActions from "./auth-actions";

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default mapDispatchToProps;
