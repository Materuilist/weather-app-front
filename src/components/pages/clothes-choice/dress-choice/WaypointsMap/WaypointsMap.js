import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ALERT_TYPES, PERM_LOCATION } from "../../../../../constants";
import mapDispatchToProps from "../../../../../store/actions";

const MAX_WAYPOINTS_COUNT = 4;

const WaypointsMap = ({ waypoints, dressChoiceActions, alertsActions }) => {
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
            mapRef.current = new window.ymaps.Map("waypointsMap", {
              center: PERM_LOCATION,
              zoom: 9,
              controls: [],
            });

            const regions = window.ymaps
              .geoQuery(geoJson)
              .setOptions({ fillColor: "#dceef4", fillOpacity: "0.6" });
            regions.addToMap(mapRef.current);

            regions.then(() => {
              const currentRegionBorders =
                regions.searchContaining(PERM_LOCATION);
              regions.removeFromMap(mapRef.current);
              currentRegionBorders.addToMap(mapRef.current);
              regionsRef.current = currentRegionBorders;
              mapRef.current.options.set(
                "restrictMapArea",
                currentRegionBorders.get(0).geometry.getBounds()
              );
            });

            var multiRoute = new window.ymaps.multiRouter.MultiRoute(
              { referencePoints: [PERM_LOCATION] },
              {
                editorDrawOver: true,
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
          });
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

    const isNoPoints =
      isInRegion &&
      previousValidReferencePointsRef.current.length &&
      !newWaypointsMapped.length;
    const isTooManyPoints =
      isInRegion &&
      previousValidReferencePointsRef.current.length &&
      newWaypointsMapped.length > MAX_WAYPOINTS_COUNT;

    const isValid = isInRegion && !isNoPoints && !isTooManyPoints;

    if (isValid) {
      dressChoiceActions.changeWaypoints(newWaypointsMapped);
      previousValidReferencePointsRef.current = newWaypointsMapped;
    } else {
      alertsActions.showAlert(
        !isInRegion
          ? "You are not allowed to set points outside your region!"
          : isNoPoints
          ? "At least one point must exist!"
          : `${MAX_WAYPOINTS_COUNT} is maximum amount of points available!`,
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

  return <div id="waypointsMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ dressChoice: { waypoints } }) => ({
  waypoints,
});

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsMap);
