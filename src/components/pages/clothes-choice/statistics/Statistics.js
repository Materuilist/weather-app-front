import React from "react";
import { connect } from "react-redux";
import { getOutfitDataUrl } from "../../../../utils";
import OutfitsMap from "./maps/OutfitsMap";
import WaypointMap from "./maps/WaypointMap";

const Statistics = ({ waypoint, data }) => {
  return (
    <div className="d-flex flex-grow-1 overflow-hidden">
      <div className="col-4 px-0 h-100">statistics</div>
      <div className="col-8 position-relative px-0 h-100">
        {data && Object.keys(data).length ? <OutfitsMap /> : <WaypointMap />}
      </div>
    </div>
  );
};

const mapStateToProps = ({ statistics: { data, waypoint } }) => ({
  data,
  waypoint,
});

export default connect(mapStateToProps)(Statistics);
