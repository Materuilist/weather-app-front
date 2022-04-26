import React from "react";
import { BODY_PARTS } from "../../../constants";

const OutfitRepresentation = ({ layerGarments }) => {
  const getPositionStyle = (bodyPartId, isDualPartLeft = true) => {
    switch (bodyPartId) {
      case BODY_PARTS.HEAD:
        return { top: 0, left: "25%", width: "50%", height: "20%" };
      case BODY_PARTS.NECK:
        return {
          top: "20%",
          left: "35%",
          width: "30%",
          height: "15%",
        };
      case BODY_PARTS.BODY:
        return { top: "35%", height: "25%", left: "30%", width: "40%" };
      case BODY_PARTS.LEG:
        return { top: "60%", height: "25%", left: "30%", width: "40%" };
      case BODY_PARTS.FOOT:
        return {
          top: "85%",
          [isDualPartLeft ? "left" : "right"]: "30%",
          height: "15%",
          width: "15%",
          transform: `scale(${isDualPartLeft ? 1 : -1},1)`,
        };
      case BODY_PARTS.HAND:
        return {
          top: "40%",
          [isDualPartLeft ? "left" : "right"]: "10%",
          height: "20%",
          width: "20%",
          transform: `scale(${isDualPartLeft ? 1 : -1},1)`,
        };
    }
  };

  return (
    <div className="h-100 w-100 position-relative d-flex flex-column justify-content-center align-items-center">
      {layerGarments.map(({ id, imageData, bodyPartId }) => (
        <>
          <div
            key={id}
            className="position-absolute"
            style={{ ...getPositionStyle(bodyPartId) }}
          >
            <img
              src={imageData}
              className="h-100 max-width-100 d-block mx-auto"
            />
          </div>
          {[BODY_PARTS.HAND, BODY_PARTS.FOOT].includes(bodyPartId) && (
            <div
              key={id + "right"}
              className="position-absolute"
              style={{ ...getPositionStyle(bodyPartId, false) }}
            >
              <img
                src={imageData}
                className="h-100 max-width-100 d-block mx-auto"
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default OutfitRepresentation;
