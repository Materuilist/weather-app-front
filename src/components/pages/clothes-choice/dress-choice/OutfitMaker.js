import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../store/actions";
import Loader from "../../../shared/Loader/Loader";
import GarmentsSearch from "./GarmentsSearch";

const OutfitMaker = ({ selectedGarments, allGarments, dressChoiceActions }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getGarments();
  }, []);

  const getGarments = () => {
    setIsLoading(true);

    dressChoiceActions.getGarments(() => setIsLoading(false));
  };

  const toggleWardrobe = (isWardrobe, garmentId) => {
    setIsLoading(true);

    dressChoiceActions[isWardrobe ? "addToWardrobe" : "removeFromWardrobe"](
      garmentId,
      () => setIsLoading(false)
    );
  };

  return (
    <div className="h-100 position-relative">
      <Loader isLoading={isLoading} />
      <div className="h-50">choose</div>
      <div className="h-50">
        <GarmentsSearch
          garments={allGarments}
          toggleWardrobe={toggleWardrobe}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ dressChoice }) => ({
  selectedGarments: dressChoice.selectedGarments,
  allGarments: dressChoice.allGarments,
});

export default connect(mapStateToProps, mapDispatchToProps)(OutfitMaker);
