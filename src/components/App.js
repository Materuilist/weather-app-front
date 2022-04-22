import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ROLES, ROUTES_URLS } from "../constants";

import mapDispatchToProps from "../store/actions";
import Auth from "./pages/auth/Auth";
import Designer from "./pages/designer/Designer";
import Loader from "./shared/Loader/Loader";

import "./app.scss";
import ClothesChoice from "./pages/clothes-choice/ClothesChoice";

function App({ user, authActions }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authActions.getUser(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Loader isLoading={isLoading} />
      {!isLoading && (
        <Switch>
          <Route path={ROUTES_URLS.LOGIN} exact>
            <Auth />
          </Route>
          <Route path={ROUTES_URLS.REGISTER} exact>
            <Auth isRegister={true} />
          </Route>

          <Route path={ROUTES_URLS.DESIGN}>
            <Designer />
          </Route>

          <Route path={ROUTES_URLS.CLOTHES_CHOICE}>
            <ClothesChoice />
          </Route>

          <Redirect
            from="*"
            to={
              user?.role?.id === ROLES.DEFAULT
                ? ROUTES_URLS.CLOTHES_CHOICE
                : ROUTES_URLS.DESIGN
            }
          />
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
