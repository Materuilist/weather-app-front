import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { ROUTES_URLS } from "../constants";

import mapDispatchToProps from "../store/actions";
import Auth from "./pages/auth/Auth";
import Designer from "./pages/designer/Designer";
import Loader from "./shared/Loader/Loader";

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
          <Route path={ROUTES_URLS.LOGIN}>
            <Auth />
          </Route>
          <Route path={ROUTES_URLS.REGISTER}>
            <Auth isRegister={true} />
          </Route>

          <Route path={ROUTES_URLS.DESIGN}>
            <Designer />
          </Route>

          <Redirect to={ROUTES_URLS.LOGIN} />
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
