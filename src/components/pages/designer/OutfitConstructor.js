import React from "react";

import { BODY_PARTS } from "../../../constants";
import Drawer from "./Drawer";
import GarmentSlot from "./GarmentSlot";

const BODY_PARTS_IDS = Object.values(BODY_PARTS);
const LEFT_BODY_PARTS = BODY_PARTS_IDS.slice(0, BODY_PARTS_IDS.length / 2);
const RIGHT_BODY_PARTS = BODY_PARTS_IDS.slice(BODY_PARTS_IDS.length / 2);

const OutfitConstructor = () => {
  return (
    <div className="outfit-constructor d-flex py-2 pt-4 px-5">
      <div className="d-flex flex-column justify-content-between">
        {LEFT_BODY_PARTS.map((bodyPartId) => (
          <GarmentSlot key={bodyPartId} bodyPartId={bodyPartId} />
        ))}
      </div>
      <div className="col">
        <Drawer />
      </div>
      <div className="d-flex flex-column justify-content-between">
        {RIGHT_BODY_PARTS.map((bodyPartId) => (
          <GarmentSlot key={bodyPartId} bodyPartId={bodyPartId} />
        ))}
      </div>
    </div>
  );
};

export default OutfitConstructor;
