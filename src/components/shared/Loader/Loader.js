import React from "react";
import ReactDOM from "react-dom";

const Loader = ({ isLoading }) => {
  return (
    isLoading &&
    ReactDOM.createPortal(
      <>
        <div
          className="position-absolute bg-light-blue h-100 w-100 opacity-50"
          style={{ top: 0, left: 0 }}
        ></div>
        <button className="center-absolute btn btn-info" type="button" disabled>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </>,
      document.getElementById("loaderBlock")
    )
  );
};

export default Loader;
