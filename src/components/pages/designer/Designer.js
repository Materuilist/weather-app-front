import React, { useState } from "react";

import Header from "../../shared/Header/Header";
import OutfitConstructor from "./OutfitConstructor.js";

import "./Designer.scss";
import GarmentsSearch from "./GarmentsSearch";
import Loader from "../../shared/Loader/Loader";

const Designer = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [garmentDraft, setGarmentDraft] = useState(null);

  return (
    <div className="layout position-relative d-flex flex-column w-100 h-100">
      <Loader isLoading={isLoading} />
      <Header />
      <div className="main d-flex">
        <div className="d-flex col-8 flex-column px-0">
          <OutfitConstructor
            garmentDraft={garmentDraft}
            setIsLoading={setIsLoading}
          />
        </div>
        <div className="col-4 px-0">
          <GarmentsSearch
            garmentDraft={garmentDraft}
            setGarmentDraft={setGarmentDraft}
          />
        </div>
      </div>
    </div>
  );
};

export default Designer;
