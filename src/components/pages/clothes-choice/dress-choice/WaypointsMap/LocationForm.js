import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../../store/actions";
import { compareLocations } from "../../../../../utils";

import PlacemarkImg from "../../../../../images/placemark.svg";

const LocationForm = ({ waypointsData, isVisible, dressChoiceActions }) => {
  const [currentWaypointCoordinates, setCurrentWaypointCoordinates] =
    useState(null);

  useEffect(() => {
    if (!currentWaypointCoordinates) {
      setCurrentWaypointCoordinates(waypointsData[0]?.coordinates);
      return;
    }

    if (
      !waypointsData.length ||
      !waypointsData.some(({ coordinates }) =>
        compareLocations(coordinates, currentWaypointCoordinates)
      )
    ) {
      setCurrentWaypointCoordinates(null);
    }
  }, [waypointsData]);

  const currentWaypoint = useMemo(
    () =>
      currentWaypointCoordinates &&
      waypointsData.find(({ coordinates }) =>
        compareLocations(coordinates, currentWaypointCoordinates)
      ),
    [waypointsData, currentWaypointCoordinates]
  );

  const onDataChange = (value, field) => {
    dressChoiceActions.setWaypointsData(
      waypointsData.map((waypoint) =>
        compareLocations(waypoint.coordinates, currentWaypointCoordinates)
          ? {
              ...waypoint,
              [field]: value,
            }
          : waypoint
      )
    );
  };

  return (
    <>
      <button
        className="position-absolute btn btn-primary"
        style={{ bottom: isVisible ? "12%" : "5%", right: "5%" }}
      >
        <img
          src={PlacemarkImg}
          onClick={() =>
            dressChoiceActions.setLocationDataPanelVisibility(!isVisible)
          }
          style={{ width: "3rem", height: "3rem" }}
        />
      </button>
      {isVisible && (
        <div
          className="position-absolute w-100 h-10 d-flex align-items-center py-3 px-5 bg-light-blue"
          style={{ bottom: 0, right: 0 }}
        >
          <img className="h-75 mr-2" src={PlacemarkImg} />
          <select
            class="form-control col-2"
            value={currentWaypointCoordinates}
            onChange={({ target: { value } }) =>
              setCurrentWaypointCoordinates(
                value.split(",").map((coord) => +coord)
              )
            }
          >
            {waypointsData.map((waypoint) => (
              <option key={waypoint.coordinates} value={waypoint.coordinates}>
                {waypoint.naming || `Point ${waypoint.index + 1}`}
              </option>
            ))}
          </select>
          <div className="col-4 d-flex align-items-center">
            <label className="mb-0 mr-1">Activity:</label>
            <span className="mr-2">{currentWaypoint.activity}%</span>
            <input
              className="form-control col"
              type="range"
              value={currentWaypoint.activity}
              min={0}
              max={100}
              step={1}
              onChange={({ target: { value } }) =>
                onDataChange(+value, "activity")
              }
            />
          </div>
          {!currentWaypoint.isAlreadyFavorite && (
            <div class="d-flex justify-content-center align-items-center p-2">
              <label
                class="mb-0 pl-0"
                for={`${currentWaypoint.coordinates}Favorites`}
              >
                Add to favorites:
              </label>
              <input
                type="checkbox"
                class="ml-2"
                id={`${currentWaypoint.coordinates}Favorites`}
                checked={currentWaypoint.addToFavorites}
                onChange={() =>
                  onDataChange(
                    !currentWaypoint.addToFavorites,
                    "addToFavorites"
                  )
                }
              />
            </div>
          )}
          {currentWaypoint.addToFavorites && (
            <input
              className="form-control"
              placeholder="Naming"
              value={currentWaypoint.naming}
              onChange={({ target: { value } }) =>
                onDataChange(value, "naming")
              }
            />
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({
  dressChoice: { waypointsData, isLocationDataPanelVisible },
}) => ({
  waypointsData,
  isVisible: isLocationDataPanelVisible,
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm);
