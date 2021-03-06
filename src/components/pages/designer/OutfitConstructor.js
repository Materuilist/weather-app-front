import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

import { LEFT_BODY_PARTS, RIGHT_BODY_PARTS } from "../../../constants";
import GarmentSlot from "../../shared/GarmentSlot/GarmentSlot.js";

import ToolPanel from "./ToolPanel";

const DEFAULT_GARMENT_PARAMETERS = {
  clo: 0.18,
  layer: 1,
  naming: "",
  sex: null,
};

const OutfitConstructor = ({ setIsLoading, garmentDraft, addGarment }) => {
  const [selectedBodyPartId, setSelectedBodyPartId] = useState(null);
  const [thickness, setThickness] = useState(1);
  const [color, setColor] = useState("#000");
  const [isErase, setIsErase] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [garmentParameters, setGarmentParameters] = useState(
    DEFAULT_GARMENT_PARAMETERS
  );

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

    const { id } = await addGarment({
      ...garmentParameters,
      imageData: areLinesDrawn ? imageData : backgroundImage,
      saveData: areLinesDrawn ? saveData : null,
      bodyPartId: selectedBodyPartId,
    });

    setBackgroundImage(null);
    setGarmentParameters(DEFAULT_GARMENT_PARAMETERS);
    setSelectedBodyPartId(null);
    drawerRef.current?.clear();

    setIsLoading(false);
  };

  useEffect(() => {
    if (garmentDraft?.saveData) {
      drawerRef.current.loadSaveData(garmentDraft.saveData);
    } else {
      drawerRef.current?.clear();
    }
  }, [garmentDraft]);

  return (
    <>
      <div className="outfit-constructor d-flex py-2 pt-4 px-5">
        <div className="d-flex flex-column justify-content-between">
          {LEFT_BODY_PARTS.map((bodyPartId) => (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              onClick={() =>
                setSelectedBodyPartId(
                  bodyPartId === selectedBodyPartId ? null : bodyPartId
                )
              }
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
              loadTimeOffset={1}
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          {RIGHT_BODY_PARTS.map((bodyPartId) => (
            <GarmentSlot
              key={bodyPartId}
              bodyPartId={bodyPartId}
              onClick={() =>
                setSelectedBodyPartId(
                  bodyPartId === selectedBodyPartId ? null : bodyPartId
                )
              }
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
