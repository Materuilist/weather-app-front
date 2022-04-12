import React, { useEffect, useRef } from "react";
import scssVariables from "../../../_variables.module.scss";

const BACKGROUND_VERTICAL_PADDING_PERCENTS = 10;

const HEAD_SHARE = 0.25;
const BODY_SHARE = 0.4;
const NECK_SHARE = 0.05;
const LEG_SHARE = 0.3;

const BOOT_WIDTH_SHARE = 0.13;

const LEG_BOOT_SHARE = 0.3;
const ARM_HAND_SHARE = 0.15;

const PERSON_WIDTH_SHARE = 0.3;

const Drawer = () => {
  // person's skeleton to draw on
  const backgroundCanvasRef = useRef();

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
      (-PERSON_WIDTH_SHARE / 2) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE) * backgroundHeight +
        (PERSON_WIDTH_SHARE / 2) * backgroundWidth
    );
    context.moveTo(0, (HEAD_SHARE + NECK_SHARE) * backgroundHeight);
    context.lineTo(
      (PERSON_WIDTH_SHARE / 2) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE) * backgroundHeight +
        (PERSON_WIDTH_SHARE / 2) * backgroundWidth
    );
    // draw legs
    context.moveTo(
      0,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight
    );
    // left leg
    context.lineTo(
      (-PERSON_WIDTH_SHARE / 4) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight +
        LEG_SHARE * backgroundWidth
    );
    // left foot
    context.lineTo(
      -BOOT_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight +
        LEG_SHARE * backgroundWidth
    );
    context.moveTo(
      0,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight
    );
    // right leg
    context.lineTo(
      (PERSON_WIDTH_SHARE / 4) * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight +
        LEG_SHARE * backgroundWidth
    );
    // right foot
    context.lineTo(
      BOOT_WIDTH_SHARE * backgroundWidth,
      (HEAD_SHARE + NECK_SHARE + BODY_SHARE) * backgroundHeight +
        LEG_SHARE * backgroundWidth
    );

    context.stroke();
  }, []);

  return <canvas className="w-100 h-100" ref={backgroundCanvasRef} />;
};

export default Drawer;
