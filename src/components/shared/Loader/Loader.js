import React from "react";

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <button class="center-absolute btn btn-info" type="button" disabled>
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    )
  );
};

export default Loader;
