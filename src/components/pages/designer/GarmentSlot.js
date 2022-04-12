import React, { useMemo } from "react";

import HatImg from "../../../images/hat.svg";
import TshirtImg from "../../../images/tshirt.svg";
import PantsImg from "../../../images/pants.svg";
import ScarfImg from "../../../images/scarf.svg";
import BootImg from "../../../images/boot.svg";
import GloveImg from "../../../images/glove.svg";
import { BODY_PARTS } from "../../../constants";

const GarmentSlot = ({ bodyPartId }) => {
  const garmentImage = useMemo(() => {
    switch (bodyPartId) {
      case BODY_PARTS.HEAD:
        return HatImg;
      case BODY_PARTS.BODY:
        return TshirtImg;
      case BODY_PARTS.LEG:
        return PantsImg;
      case BODY_PARTS.NECK:
        return ScarfImg;
      case BODY_PARTS.FOOT:
        return BootImg;
      case BODY_PARTS.HAND:
        return GloveImg;
      default:
        return null;
    }
  }, [bodyPartId]);

  return (
    <div className="garment-slot d-flex justify-content-center align-items-center">
      <img src={garmentImage} />
    </div>
  );
};

export default GarmentSlot;
