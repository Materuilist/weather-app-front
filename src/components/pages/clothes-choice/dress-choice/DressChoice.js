import React from "react";
import OutfitMaker from "./OutfitMaker";

const DressChoice = () => {
  return (
    <div className="d-flex flex-grow-1">
      <div className="col-4 px-0 h-100">
        <OutfitMaker />
      </div>
      <div className="col-8 px-0 h-100">map</div>
    </div>
  );
};

export default DressChoice;
