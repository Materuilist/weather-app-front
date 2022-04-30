import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../store/actions";
import Loader from "../../../shared/Loader/Loader";
import AssessmentModal from "./AssessmentModal/AssessmentModal";
import OutfitMaker from "./OutfitMaker";
import FavoritesForm from "./WaypointsMap/FavoritesForm";
import LocationForm from "./WaypointsMap/LocationForm";
import WaypointsMap from "./WaypointsMap/WaypointsMap";

const DressChoice = ({ dressChoiceActions }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    dressChoiceActions.getUserLocations(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="col-4 px-0 h-100">
          <OutfitMaker />
        </div>
        <div className="col-8 position-relative px-0 h-100">
          <WaypointsMap />
          <LocationForm />
          <FavoritesForm />
        </div>
      </div>
      <AssessmentModal />
    </>
  );
};

export default connect(null, mapDispatchToProps)(DressChoice);
