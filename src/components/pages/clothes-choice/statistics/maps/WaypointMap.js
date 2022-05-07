import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ALERT_TYPES, PERM_LOCATION } from "../../../../../constants";
import mapDispatchToProps from "../../../../../store/actions";

const WaypointMap = ({ waypoint, statisticsActions, alertsActions }) => {
  const mapRef = useRef(null);
  const multiRouteRef = useRef(null);
  const regionsRef = useRef(null);

  const previousValidReferencePointsRef = useRef([]);

  useEffect(() => {
    window.ymaps.ready(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          window.ymaps.borders.load("RU").then((geoJson) => {
            mapRef.current = new window.ymaps.Map("waypointMap", {
              center: waypoint?.coordinates || PERM_LOCATION,
              zoom: 9,
              controls: [],
            });

            const regions = window.ymaps
              .geoQuery(geoJson)
              .setOptions({ fillColor: "#dceef4", fillOpacity: "0.6" });
            regions.addToMap(mapRef.current);
            regionsRef.current = regions;

            var multiRoute = new window.ymaps.multiRouter.MultiRoute(
              {
                referencePoints: [waypoint?.coordinates || PERM_LOCATION],
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
          });
        },
        () => alert("You need to enable geolocation")
      );
    });
  }, []);

  const onWayPointsChange = () => {
    const newWaypoints = multiRouteRef.current.getWayPoints();
    const newWaypointsMapped = [];
    let isInRegion = true;

    newWaypoints.each((point) => {
      const pointData = point.properties.getAll();

      if (regionsRef.current) {
        isInRegion =
          isInRegion &&
          Boolean(regionsRef.current.searchContaining(point).get(0));

        if (!isInRegion) {
          return;
        }
      }

      newWaypointsMapped.push({
        index: pointData.index,
        coordinates: [...pointData.coordinates].reverse(),
      });
    });

    if (isInRegion) {
      statisticsActions.setWaypoint(newWaypointsMapped[0]);
      previousValidReferencePointsRef.current = newWaypointsMapped;
    } else {
      alertsActions.showAlert(
        "You are not allowed to set points outside your region!",
        ALERT_TYPES.ERROR
      );
      if (previousValidReferencePointsRef.current.length) {
        multiRouteRef.current.model.setReferencePoints(
          previousValidReferencePointsRef.current.map(
            ({ coordinates }) => coordinates
          )
        );
      }
    }
  };

  return <div id="waypointMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ statistics: { waypoint } }) => ({
  waypoint,
});

export default connect(mapStateToProps, mapDispatchToProps)(WaypointMap);
