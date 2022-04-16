import React from "react";

const ToolPanel = ({
  color,
  setColor,
  thickness,
  setThickness,
  isErase,
  setIsErase,
  undoHandler,
  clearHandler,
}) => {
  return (
    <div className="tool-panel d-flex w-100 h-100">
      <div className="col-2 border-right-primary h-100 d-flex flex-column justify-content-center align-items-center p-3">
        <button className="btn btn-primary mb-4" onClick={undoHandler}>
          Undo
        </button>
        <button className="btn btn-primary" onClick={clearHandler}>
          Clear
        </button>
      </div>
      <div className="col-5 border-right-primary h-100 d-flex flex-column justify-content-center align-items-start p-3">
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Thickness:</label>
          <input
            type="range"
            class="form-control-range col"
            value={thickness}
            onChange={({ target: { value } }) => setThickness(+value)}
            min="1"
          />
        </div>
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Color:</label>
          <input
            className="col form-control"
            type="color"
            value={color}
            onChange={({ target: { value } }) => setColor(value)}
          />
        </div>
        <div className="form-group d-flex w-100 align-items-center">
          <label className="col-3 form-label mb-0" htmlFor="isErase">
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
      <div className="col-5 h-100 d-flex flex-column justify-content-center align-items-start p-3">
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Clo:</label>
          <input type="number" step="0.01" min="0" class="form-control col" />
        </div>
        <div className="form-group d-flex w-100 align-items-center mb-3">
          <label className="col-3 form-label mb-0">Layer:</label>
          <input
            type="number"
            step="1"
            min="0"
            max="3"
            class="form-control col"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
};

export default ToolPanel;
