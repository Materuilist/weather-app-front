import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../../store/actions";

const WaypointMap = ({ waypoint, statisticsActions }) => {
  const mapRef = useRef(null);
  const multiRouteRef = useRef(null);

  useEffect(() => {
    window.ymaps.ready(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          mapRef.current = new window.ymaps.Map("waypointMap", {
            center: [latitude, longitude],
            zoom: 9,
            controls: [],
          });

          var multiRoute = new window.ymaps.multiRouter.MultiRoute(
            {
              referencePoints: [waypoint?.coordinates || [latitude, longitude]],
            },
            {
              editorDrawOver: false,
              editorMidPointsType: "way",
            }
          );

          multiRouteRef.current = multiRoute;

          multiRoute.model.events.add("requestsuccess", onWayPointsChange);

          multiRoute.editor.start({
            addWayPoints: false,
            removeWayPoints: false,
            addMidPoints: false,
          });

          mapRef.current.geoObjects.add(multiRoute);
        },
        () => alert("You need to enable geolocation")
      );
    });
  }, []);

  const onWayPointsChange = () => {
    const newWaypoints = multiRouteRef.current.getWayPoints();
    const newWaypointsMapped = [];

    newWaypoints.each((point) => {
      const pointData = point.properties.getAll();

      newWaypointsMapped.push({
        index: pointData.index,
        coordinates: [...pointData.coordinates].reverse(),
      });
    });

    statisticsActions.setWaypoint(newWaypointsMapped[0]);
  };

  return <div id="waypointMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ statistics: { waypoint } }) => ({
  waypoint,
});

export default connect(mapStateToProps, mapDispatchToProps)(WaypointMap);
