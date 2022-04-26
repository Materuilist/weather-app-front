import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../../store/actions";
import OutfitRepresentation from "../../../../shared/OutfitRepresentation/OutfitRepresentation";

const OutfitPanel = ({ statisticsData, statisticsActions }) => {
  const [displayLayer, setDisplayLayer] = useState(1);

  const layerGarments = useMemo(
    () =>
      statisticsData.mostPopularOutfit
        .filter(({ layer }) => layer === displayLayer)
        .sort(
          (garmentA, garmentB) => garmentA.bodyPartId - garmentB.bodyPartId
        ),
    [statisticsData.mostPopularOutfit, displayLayer]
  );

  return (
    <div
      className="position-absolute d-flex flex-column bg-light-blue w-30 p-3 border-bottom border-left border-primary"
      style={{
        zIndex: 1,
        top: 0,
        bottom: "50%",
        right: 0,
        borderRadius: "0 0 0 5%",
      }}
    >
      <div className="d-flex align-items-center justify-content-between py-2">
        <button
          className="btn btn-primary rounded"
          onClick={() => statisticsActions.setData(null)}
        >
          Back
        </button>
        <div className="d-flex align-items-center">
          <h5 className="mb-0 mr-2">{displayLayer}</h5>
          <div>
            <div
              className="triangle mb-2 opacity-70-on-hover cursor-pointer"
              onClick={
                displayLayer < 3
                  ? () => setDisplayLayer(displayLayer + 1)
                  : null
              }
            ></div>
            <div
              className="triangle triangle-reversed opacity-70-on-hover cursor-pointer"
              onClick={
                displayLayer > 1
                  ? () => setDisplayLayer(displayLayer - 1)
                  : null
              }
            ></div>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 border border-primary rounded">
        <OutfitRepresentation layerGarments={layerGarments} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ statistics: { data } }) => ({
  statisticsData: data,
});

export default connect(mapStateToProps, mapDispatchToProps)(OutfitPanel);
