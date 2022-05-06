import React from "react";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => {
  return alerts.length ? (
    <div className="position-absolute" style={{ top: "3%", right: "3%" }}>
      {alerts.map(({ text, type, id }) => (
        <div key={id} class={`alert alert-${type}`} role="alert">
          {text}
        </div>
      ))}
    </div>
  ) : null;
};

const mapStateToProps = ({ alerts }) => ({
  alerts,
});

export default connect(mapStateToProps)(Alerts);
