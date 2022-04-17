import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

import { BODY_PARTS } from "../../../constants";
import GarmentSlot from "./GarmentSlot";

import TshirtImg from "../../../images/tshirt.svg";
import scssVariables from "../../../_variables.module.scss";
import ToolPanel from "./ToolPanel";
import GarmentService from "../../../services/garment-service";

const garmentService = new GarmentService();

// const BACKGROUND_VERTICAL_PADDING_PERCENTS = 10;

// const HEAD_SHARE = 0.25;
// const BODY_SHARE = 0.4;
// const NECK_SHARE = 0.05;
// const LEG_HEIGHT_SHARE = 0.3;
// const ARM_HEIGHT_SHARE = 0.22;

// const ARM_WIDTH_SHARE = 0.15;
// const LEG_WIDTH_SHARE = 0.04;
// const FOOT_WIDTH_SHARE = 0.04;

// const LEG_BOOT_SHARE = 0.15;
// const ARM_HAND_SHARE = 0.15;

// const PERSON_WIDTH_SHARE = 0.3;

const BODY_PARTS_IDS = Object.values(BODY_PARTS);
const LEFT_BODY_PARTS = BODY_PARTS_IDS.slice(0, BODY_PARTS_IDS.length / 2);
const RIGHT_BODY_PARTS = BODY_PARTS_IDS.slice(BODY_PARTS_IDS.length / 2);

const OutfitConstructor = ({ setIsLoading }) => {
  const [selectedBodyPartId, setSelectedBodyPartId] = useState(null);
  const [thickness, setThickness] = useState(1);
  const [color, setColor] = useState("#000");
  const [isErase, setIsErase] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [garmentParameters, setGarmentParameters] = useState({
    clo: 0.18,
    layer: 1,
    naming: "",
    sex: null,
  });

  const drawerRef = useRef();

  const setGarmentParameter = (name, value) =>
    setGarmentParameters({ ...garmentParameters, [name]: value });

  const isSubmitDisabled =
    !selectedBodyPartId ||
    garmentParameters.naming.length < 2 ||
    !garmentParameters.layer ||
    !garmentParameters.clo ||
    !garmentParameters.sex;

  const onSubmit = async () => {
    setIsLoading(true);

    const saveData = drawerRef.current.getSaveData();
    const imageData = drawerRef.current.getDataURL();
    const saveDataDeserialized = JSON.parse(saveData);
    const areLinesDrawn = saveDataDeserialized.lines.length > 0;

    const { id } = await garmentService.addGarment({
      ...garmentParameters,
      imageData: areLinesDrawn ? imageData : backgroundImage,
      saveData: areLinesDrawn ? saveData : null,
      bodyPartId: selectedBodyPartId,
    });
    console.log(id);

    setIsLoading(false);
  };

  return (
    <>
      <div className="outfit-constructor d-flex py-2 pt-4 px-5">
        <div className="d-flex flex-column justify-content-between">
          {LEFT_BODY_PARTS.map((bodyPartId) => (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              setSelectedBodyPartId={setSelectedBodyPartId}
              isSelected={selectedBodyPartId === bodyPartId}
            />
          ))}
        </div>
        <div className="col">
          <div className="h-100 w-100 position-relative d-flex justify-content-center align-items-center">
            {backgroundImage && (
              <img
                src={backgroundImage}
                className="w-75 h-100 position-absolute opacity-70"
              />
            )}
            <CanvasDraw
              className="border border-dotted h-100 w-75"
              hideGrid
              brushColor={isErase ? "#fff" : color}
              brushRadius={thickness}
              ref={drawerRef}
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          {RIGHT_BODY_PARTS.map((bodyPartId) => (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              setSelectedBodyPartId={setSelectedBodyPartId}
              isSelected={selectedBodyPartId === bodyPartId}
            />
          ))}
        </div>
      </div>
      <div className="outfit-parameters">
        <ToolPanel
          color={color}
          isErase={isErase}
          thickness={thickness}
          setColor={setColor}
          setIsErase={setIsErase}
          setThickness={setThickness}
          undoHandler={() => drawerRef.current?.undo()}
          clearHandler={() => drawerRef.current?.clear()}
          backgroundImage={backgroundImage}
          setBackgroundImage={setBackgroundImage}
          naming={garmentParameters.naming}
          clo={garmentParameters.clo}
          layer={garmentParameters.layer}
          sex={garmentParameters.sex}
          setNaming={(value) => setGarmentParameter("naming", value)}
          setClo={(value) => setGarmentParameter("clo", value)}
          setLayer={(value) => setGarmentParameter("layer", value)}
          setSex={(value) => setGarmentParameter("sex", value)}
          isSubmitDisabled={isSubmitDisabled}
          submitHandler={onSubmit}
        />
      </div>
    </>
  );
};

export default OutfitConstructor;
