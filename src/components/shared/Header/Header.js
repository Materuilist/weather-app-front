import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import mapDispatchToProps from "../../../store/actions";

import LogOutIcon from "../../../images/log-out.svg";
import { ROUTES_URLS } from "../../../constants";

const Header = ({ authActions }) => {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <Route path={ROUTES_URLS.CLOTHES_CHOICE}>
        <div>tabs</div>
        <div>inputs</div>
      </Route>
      <img
        className="me-3 p-1 cursor-pointer opacity-70-on-hover ms-auto"
        src={LogOutIcon}
        onClick={authActions.logOut}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
