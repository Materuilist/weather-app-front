import classNames from "classnames";
import React from "react";
import { GARMENT_SEX } from "../../../constants";

const ToolPanel = ({
  color,
  setColor,
  thickness,
  setThickness,
  isErase,
  setIsErase,
  undoHandler,
  clearHandler,
  garmentImage,
  setGarmentImage,
  clo,
  layer,
  naming,
  setClo,
  setLayer,
  setNaming,
  sex,
  setSex,
  isSubmitDisabled,
}) => {
  const onGarmentInput = ({
    target: {
      files: [file],
    },
  }) => {
    if (!file) {
      setGarmentImage(null);
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => setGarmentImage(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="tool-panel d-flex w-100 h-100">
      <div className="col-2 border-right-primary h-100 d-flex flex-column justify-content-center align-items-center p-3">
        <button className="btn btn-primary mb-3" onClick={undoHandler}>
          Undo
        </button>
        <button className="btn btn-primary mb-3" onClick={clearHandler}>
          Clear
        </button>
        <label
          htmlFor="garmentInput"
          className={classNames("btn btn-primary", { disabled: garmentImage })}
        >
          Browse Garment
        </label>
        <input
          id="garmentInput"
          hidden
          type="file"
          accept="image/*"
          onChange={onGarmentInput}
          disabled={garmentImage}
        />
      </div>
      <div className="col-4 border-right-primary h-100 d-flex flex-column justify-content-center align-items-start p-3">
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-4 form-label mb-0">Thickness:</label>
          <input
            type="range"
            class="form-control-range col"
            value={thickness}
            onChange={({ target: { value } }) => setThickness(+value)}
            min="1"
          />
        </div>
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-4 form-label mb-0">Color:</label>
          <input
            className="col form-control"
            type="color"
            value={color}
            onChange={({ target: { value } }) => setColor(value)}
          />
        </div>
        <div className="form-group d-flex w-100 align-items-center">
          <label className="col-4 form-label mb-0" htmlFor="isErase">
            Erase:
          </label>
          <input
            type="checkbox"
            class="custom-control-input"
            id="isErase"
            checked={isErase}
            onChange={() => setIsErase(!isErase)}
          />
        </div>
      </div>
      <div className="col-6 h-100 d-flex flex-column justify-content-center align-items-start p-3">
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Naming:</label>
          <input
            type="text"
            minLength="2"
            class="form-control col"
            value={naming}
            onChange={({ target: { value } }) => setNaming(value)}
          />
        </div>
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Clo:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            class="form-control col-3 w-25"
            value={clo}
            onChange={({ target: { value } }) => setClo(value)}
          />
          <div className="col-6 d-flex">
            <div class="form-check col ms-3">
              <input
                class="form-check-input"
                type="radio"
                id="maleSexGarment"
                checked={sex === GARMENT_SEX.MALE}
                onChange={() => setSex(GARMENT_SEX.MALE)}
              />
              <label class="form-check-label" for="maleSexGarment">
                M
              </label>
            </div>
            <div class="form-check col">
              <input
                class="form-check-input"
                type="radio"
                id="femaleSexGarment"
                checked={sex === GARMENT_SEX.FEMALE}
                onChange={() => setSex(GARMENT_SEX.FEMALE)}
              />
              <label class="form-check-label" for="femaleSexGarment">
                F
              </label>
            </div>
            <div class="form-check col">
              <input
                class="form-check-input"
                type="radio"
                id="uniSexGarment"
                checked={sex === GARMENT_SEX.UNISEX}
                onChange={() => setSex(GARMENT_SEX.UNISEX)}
              />
              <label class="form-check-label" for="uniSexGarment">
                M/F
              </label>
            </div>
          </div>
        </div>
        <div className="form-group d-flex w-100 align-items-center">
          <label className="col-3 form-label mb-0">Layer:</label>
          <input
            type="number"
            step="1"
            min="0"
            max="3"
            class="form-control col"
            value={layer}
            onChange={({ target: { value } }) => setLayer(value)}
          />
          <button className="btn btn-primary" disabled={isSubmitDisabled}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
