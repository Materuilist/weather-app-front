import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { CLOTHES_CHOICE_ROUTES } from "../../../constants";
import Header from "../../shared/Header/Header";
import Loader from "../../shared/Loader/Loader";
import DressChoice from "./dress-choice/DressChoice";
import Statistics from "./statistics/Statistics";

const ClothesChoice = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="layout position-relative d-flex flex-column w-100 h-100">
      <Loader isLoading={isLoading} />
      <Header />
      <Switch>
        <Route path={CLOTHES_CHOICE_ROUTES.DRESS} exact>
          <DressChoice />
        </Route>
        <Route path={CLOTHES_CHOICE_ROUTES.STATISTICS}>
          <Statistics />
        </Route>
        <Redirect to={CLOTHES_CHOICE_ROUTES.DRESS} />
      </Switch>
    </div>
  );
};

export default ClothesChoice;
