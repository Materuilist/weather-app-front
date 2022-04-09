import React from "react";

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <button className="center-absolute btn btn-info" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    )
  );
};

export default Loader;
