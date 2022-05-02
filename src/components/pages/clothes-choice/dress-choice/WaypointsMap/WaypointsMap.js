import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../../store/actions";

const WaypointsMap = ({ waypoints, dressChoiceActions }) => {
  const mapRef = useRef(null);
  const multiRouteRef = useRef(null);

  useEffect(() => {
    window.ymaps.ready(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          mapRef.current = new window.ymaps.Map("waypointsMap", {
            center: [latitude, longitude],
            zoom: 9,
            controls: [],
          });

          var multiRoute = new window.ymaps.multiRouter.MultiRoute(
            { referencePoints: [[latitude, longitude]] },
            {
              editorDrawOver: false,
              editorMidPointsType: "way",
            }
          );

          multiRouteRef.current = multiRoute;

          multiRoute.model.events.add("requestsuccess", onWayPointsChange);

          multiRoute.editor.start({
            addWayPoints: true,
            removeWayPoints: true,
            addMidPoints: true,
          });

          mapRef.current.geoObjects.add(multiRoute);
        },
        () => alert("You need to enable geolocation")
      );
    });
  }, []);

  // when user selects favorite point
  useEffect(() => {
    const currentWaypoints = multiRouteRef.current?.getWayPoints();

    if (!currentWaypoints) {
      return;
    }

    const currentWaypointsMapped = [];

    currentWaypoints.each((point) => {
      const pointData = point.properties.getAll();

      currentWaypointsMapped.push({
        index: pointData.index,
        coordinates: [...pointData.coordinates].reverse(),
      });
    });

    if (currentWaypointsMapped.length !== waypoints.length)
      multiRouteRef.current.model.setReferencePoints(
        waypoints.map(({ coordinates }) => coordinates)
      );
  }, [waypoints]);

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

    dressChoiceActions.changeWaypoints(newWaypointsMapped);
  };

  return <div id="waypointsMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ dressChoice: { waypoints } }) => ({
  waypoints,
});

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsMap);
