import React from "react";
import AssessmentModal from "./AssessmentModal/AssessmentModal";
import OutfitMaker from "./OutfitMaker";
import LocationForm from "./WaypointsMap/LocationForm";
import WaypointsMap from "./WaypointsMap/WaypointsMap";

const DressChoice = () => {
  return (
    <>
      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="col-4 px-0 h-100">
          <OutfitMaker />
        </div>
        <div className="col-8 position-relative px-0 h-100">
          <WaypointsMap />
          <LocationForm />
        </div>
      </div>
      <AssessmentModal />
    </>
  );
};

export default DressChoice;
