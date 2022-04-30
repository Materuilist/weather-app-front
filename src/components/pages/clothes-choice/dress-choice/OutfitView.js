import React, { useMemo } from "react";
import { connect } from "react-redux";
import { LEFT_BODY_PARTS, RIGHT_BODY_PARTS } from "../../../../constants";
import mapDispatchToProps from "../../../../store/actions";
import GarmentSlot from "../../../shared/GarmentSlot/GarmentSlot";
import OutfitRepresentation from "../../../shared/OutfitRepresentation/OutfitRepresentation";

const OutfitView = ({
  selectedGarments,
  dressChoiceActions,
  displayLayer,
  setDisplayLayer,
}) => {
  const layerGarments = useMemo(
    () =>
      selectedGarments
        .filter(({ layer }) => layer === displayLayer)
        .sort(
          (garmentA, garmentB) => garmentA.bodyPartId - garmentB.bodyPartId
        ),
    [selectedGarments, displayLayer]
  );

  const getGarmentByBodyPart = (bodyPartId) =>
    layerGarments.find(
      ({ bodyPartId: garmentBodyPartId }) => garmentBodyPartId === bodyPartId
    );

  return (
    <div className="outfit-view h-100 d-flex py-2 pt-4 px-3">
      <div className="d-flex flex-column justify-content-between">
        {LEFT_BODY_PARTS.map((bodyPartId) => {
          const garment = getGarmentByBodyPart(bodyPartId);

          return (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              onClick={
                garment
                  ? () => dressChoiceActions.toggleGarmentSelection(garment)
                  : null
              }
              image={garment?.imageData}
            />
          );
        })}
      </div>
      <div className="col position-relative">
        <div
          className="position-absolute d-flex align-items-center"
          style={{ top: "5%", right: "5%", zIndex: 2 }}
        >
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
                displayLayer > 0
                  ? () => setDisplayLayer(displayLayer - 1)
                  : null
              }
            ></div>
          </div>
        </div>
        <OutfitRepresentation layerGarments={layerGarments} />
      </div>
      <div className="d-flex flex-column justify-content-between">
        {RIGHT_BODY_PARTS.map((bodyPartId) => {
          const garment = getGarmentByBodyPart(bodyPartId);

          return (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              onClick={
                garment
                  ? () => dressChoiceActions.toggleGarmentSelection(garment)
                  : null
              }
              image={garment?.imageData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(OutfitView);
