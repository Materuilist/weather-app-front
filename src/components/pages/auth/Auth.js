import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { ROUTES_URLS } from "../../../constants";
import mapDispatchToProps from "../../../store/actions";

const Auth = ({ isRegister = false, authActions }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState(true);

  const onSubmit = (event) => {
    event.preventDefault();

    authActions.authorize(isRegister, login, password, sex);
  };

  return (
    <form
      className="h-100 w-100 d-flex flex-column justify-content-center align-items-center"
      onSubmit={onSubmit}
    >
      <div className="form-group mb-3">
        <input
          className="form-control"
          name="login"
          placeholder="Login"
          value={login}
          onChange={({ target: { value } }) => setLogin(value)}
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      {isRegister && (
        <div className="form-group mb-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sex"
              id="sexMale"
              value="true"
              checked={sex}
              onChange={() => setSex(!sex)}
            />
            <label className="form-check-label" htmlFor="sexMale">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="sex"
              id="sexFemale"
              value="false"
              checked={!sex}
              onChange={() => setSex(!sex)}
            />
            <label className="form-check-label" htmlFor="sexFemale">
              Female
            </label>
          </div>
        </div>
      )}
      <NavLink to={isRegister ? ROUTES_URLS.LOGIN : ROUTES_URLS.REGISTER}>
        {isRegister ? "Login" : "Register"}
      </NavLink>
      <button className="btn btn-primary text-white" type="submit">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(Auth);
