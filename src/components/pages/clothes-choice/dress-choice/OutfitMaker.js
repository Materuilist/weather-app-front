import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../store/actions";
import Loader from "../../../shared/Loader/Loader";
import GarmentsSearch from "./GarmentsSearch";
import OutfitView from "./OutfitView";

const OutfitMaker = ({ selectedGarments, allGarments, dressChoiceActions }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayLayer, setDisplayLayer] = useState(1);

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
      <div className="h-50">
        <OutfitView
          displayLayer={displayLayer}
          setDisplayLayer={setDisplayLayer}
          selectedGarments={selectedGarments}
        />
      </div>
      <div className="h-50">
        <GarmentsSearch
          displayLayer={displayLayer}
          selectedGarments={selectedGarments}
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
