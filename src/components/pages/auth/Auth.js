import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Auth = ({ isRegister = false }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="">
      <form>
        <input
          name="login"
          placeholder="Login"
          value={login}
          onChange={({ target: { value } }) => setLogin(value)}
        />
        <input
          name="password"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <NavLink to={isRegister ? "/login" : "/register"}>
          {isRegister ? "Login" : "Register"}
        </NavLink>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
    </div>
  );
};

export default Auth;
