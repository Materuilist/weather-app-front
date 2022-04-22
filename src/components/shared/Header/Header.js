import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import mapDispatchToProps from "../../../store/actions";

import LogOutIcon from "../../../images/log-out.svg";
import {
  CLOTHES_CHOICE_ROUTES,
  ROUTES_URLS,
  STATISTICS_NAMES,
  STATISTICS_TYPES,
} from "../../../constants";
import { NavLink } from "react-router-dom";
import ParametersForm from "./ParametersForm";

const Header = ({ authActions }) => {
  return (
    <div className="header d-flex justify-content-between align-items-center border-bottom border-primary">
      <Route path={ROUTES_URLS.CLOTHES_CHOICE}>
        <div className="d-flex col-4 border-right border-primary h-100 px-0">
          <NavLink
            to={CLOTHES_CHOICE_ROUTES.DRESS}
            exact
            activeClassName="active-link"
            className="col-6 d-flex justify-content-center align-items-center"
          >
            Dress Choice
          </NavLink>
          <NavLink
            to={`${CLOTHES_CHOICE_ROUTES.STATISTICS}/${STATISTICS_TYPES.USUALLY}`}
            isActive={(match, { pathname }) =>
              pathname.startsWith(CLOTHES_CHOICE_ROUTES.STATISTICS)
            }
            activeClassName="active-link"
            className="col-6 d-flex justify-content-center align-items-center"
          >
            <div className="col-6 d-flex justify-content-center align-items-center">
              <div class="dropdown dropright">
                <button
                  class="btn dropdown-toggle"
                  type="button"
                  id="statisticsDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sort
                </button>
                <div class="dropdown-menu" aria-labelledby="statisticsDropdown">
                  {Object.values(STATISTICS_TYPES).map((statisticId) => (
                    <NavLink
                      className="dropdown-item"
                      activeClassName="active-link"
                      to={`${CLOTHES_CHOICE_ROUTES.STATISTICS}/${statisticId}`}
                    >
                      {STATISTICS_NAMES[statisticId]}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col h-100 border-right border-primary mr-3 px-4">
          <ParametersForm />
        </div>
      </Route>
      <img
        className="mr-3 p-1 cursor-pointer opacity-70-on-hover ml-auto"
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
