import React from "react";

import Header from "../../shared/Header/Header";
import OutfitConstructor from "./OutfitConstructor.js";

import "./Designer.scss";

const Designer = ({}) => {
  return (
    <div className="layout d-flex flex-column w-100 h-100">
      <Header />
      <div className="main d-flex">
        <div className="d-flex col-8 flex-column">
          <OutfitConstructor />
        </div>
        <div className="col-4">menu</div>
      </div>
    </div>
  );
};

export default Designer;
