import React, { useState, useEffect, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

import { BODY_PARTS } from "../../../constants";
import GarmentSlot from "./GarmentSlot";

import TshirtImg from "../../../images/tshirt.svg";
import scssVariables from "../../../_variables.module.scss";
import ToolPanel from "./ToolPanel";

const BACKGROUND_VERTICAL_PADDING_PERCENTS = 10;

const HEAD_SHARE = 0.25;
const BODY_SHARE = 0.4;
const NECK_SHARE = 0.05;
const LEG_HEIGHT_SHARE = 0.3;
const ARM_HEIGHT_SHARE = 0.22;

const ARM_WIDTH_SHARE = 0.15;
const LEG_WIDTH_SHARE = 0.04;
const FOOT_WIDTH_SHARE = 0.04;

const LEG_BOOT_SHARE = 0.15;
const ARM_HAND_SHARE = 0.15;

const PERSON_WIDTH_SHARE = 0.3;

const BODY_PARTS_IDS = Object.values(BODY_PARTS);
const LEFT_BODY_PARTS = BODY_PARTS_IDS.slice(0, BODY_PARTS_IDS.length / 2);
const RIGHT_BODY_PARTS = BODY_PARTS_IDS.slice(BODY_PARTS_IDS.length / 2);

const OutfitConstructor = () => {
  const [selectedBodyPartId, setSelectedBodyPartId] = useState(null);
  const [thickness, setThickness] = useState(1);
  const [color, setColor] = useState("#000");
  const [isErase, setIsErase] = useState(false);

  // person's skeleton to draw on
  const backgroundCanvasRef = useRef();
  const drawerRef = useRef();

  const getDrawArea = (bodyPartId) => {
    const canvas = backgroundCanvasRef.current;
    const backgroundWidth = canvas.offsetWidth;
    const backgroundHeight =
      (canvas.offsetHeight * (100 - BACKGROUND_VERTICAL_PADDING_PERCENTS * 2)) /
      100;

    switch (bodyPartId) {
      case BODY_PARTS.HEAD:
        return {
          left:
            50 -
            (((HEAD_SHARE / 2) * backgroundHeight) / backgroundWidth) * 100,
          top: 0,
          width: ((HEAD_SHARE * backgroundHeight) / backgroundWidth) * 100,
          height:
            ((HEAD_SHARE * backgroundHeight) / canvas.offsetHeight) * 100 +
            BACKGROUND_VERTICAL_PADDING_PERCENTS,
        };
      case BODY_PARTS.NECK:
        return {
          left: getDrawArea(BODY_PARTS.HEAD).left,
          top: getDrawArea(BODY_PARTS.HEAD).height,
          width: getDrawArea(BODY_PARTS.HEAD).width,
          height:
            ((NECK_SHARE * backgroundHeight) / canvas.offsetHeight) * 100 * 6,
        };
      case BODY_PARTS.BODY:
        return {
          left: 50 - (ARM_WIDTH_SHARE - ARM_HAND_SHARE * ARM_WIDTH_SHARE) * 100,
          top:
            getDrawArea(BODY_PARTS.HEAD).height +
            ((NECK_SHARE * backgroundHeight) / canvas.offsetHeight) * 100,
          width: (ARM_WIDTH_SHARE - ARM_HAND_SHARE * ARM_WIDTH_SHARE) * 2 * 100,
          height:
            ((BODY_SHARE * backgroundHeight) / canvas.offsetHeight) * 100 +
            BACKGROUND_VERTICAL_PADDING_PERCENTS,
        };
      case BODY_PARTS.LEG:
        return {
          left: 50 - LEG_WIDTH_SHARE * 2 * 100,
          top:
            getDrawArea(BODY_PARTS.HEAD).height +
            (((NECK_SHARE + BODY_SHARE) * backgroundHeight) /
              canvas.offsetHeight) *
              100,
          width: LEG_WIDTH_SHARE * 4 * 100,
          height:
            (((LEG_HEIGHT_SHARE - LEG_BOOT_SHARE * LEG_HEIGHT_SHARE) *
              backgroundHeight) /
              canvas.offsetHeight) *
            100,
        };
    }
  };

  const getDrawAreaStyle = (bodyPartId) =>
    Object.entries(getDrawArea(bodyPartId)).reduce(
      (res, [key, value]) => ({
        ...res,
        [key]: `${value}%`,
      }),
      {}
    );

  useEffect(() => {
    const canvas = backgroundCanvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const backgroundWidth = canvas.width;
    const backgroundHeight =
      (canvas.height * (100 - BACKGROUND_VERTICAL_PADDING_PERCENTS * 2)) / 100;

    context.translate(
      canvas.width / 2,
      (canvas.height * BACKGROUND_VERTICAL_PADDING_PERCENTS) / 100
    );
    context.strokeStyle = scssVariables.primaryColor;
    context.lineWidth = 3;

    context.beginPath();
    // draw head
    context.arc(
      0,
      (backgroundHeight * HEAD_SHARE) / 2,
      (backgroundHeight * HEAD_SHARE) / 2,
      0,
      2 * Math.PI,
      false
    );
    // draw body and neck
    context.moveTo(0, HEAD_SHARE * backgroundHeight);
    context.lineTo(
      0,
      (HEAD_SHARE + BODY_SHARE + NECK_SHARE) * backgroundHeight
    );
    // draw arms and hands
    context.moveTo(0, (HEAD_SHARE + NECK_SHARE) * backgroundHeight);
    context.lineTo(
      -ARM_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + ARM_HEIGHT_SHARE) * backgroundHeight
    );
    context.moveTo(0, (HEAD_SHARE + NECK_SHARE) * backgroundHeight);
    context.lineTo(
      ARM_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + ARM_HEIGHT_SHARE) * backgroundHeight
    );
    // draw legs
    context.moveTo(
      0,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight
    );
    // left leg
    context.lineTo(
      -LEG_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE + LEG_HEIGHT_SHARE) *
        backgroundHeight
    );
    // left foot
    context.lineTo(
      -(LEG_WIDTH_SHARE + FOOT_WIDTH_SHARE) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE + LEG_HEIGHT_SHARE) *
        backgroundHeight
    );
    // right leg
    context.moveTo(
      0,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight
    );
    context.lineTo(
      LEG_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE + LEG_HEIGHT_SHARE) *
        backgroundHeight
    );
    // right foot
    context.lineTo(
      +(LEG_WIDTH_SHARE + FOOT_WIDTH_SHARE) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE + LEG_HEIGHT_SHARE) *
        backgroundHeight
    );

    context.stroke();
  }, []);

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
          <div className="h-100 w-100 position-relative">
            <canvas className="w-100 h-100" ref={backgroundCanvasRef} />
            {selectedBodyPartId && (
              <CanvasDraw
                className="position-absolute opacity-70 border border-secondary"
                style={getDrawAreaStyle(selectedBodyPartId)}
                hideGrid
                // imgSrc={TshirtImg}
                // onChange={console.log}
                brushColor={isErase ? "#fff" : color}
                brushRadius={thickness}
                ref={drawerRef}
              />
            )}
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
        />
      </div>
    </>
  );
};

export default OutfitConstructor;
