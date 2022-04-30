import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { STATISTICS_RADIUS_KM } from "../../../../../constants";
import mapDispatchToProps from "../../../../../store/actions";
import { getOutfitDataUrl } from "../../../../../utils";

const OutfitsMap = ({ waypoint, data, statisticsActions }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.ymaps.ready(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude, longitude },
          } = position;

          const coordinates = waypoint?.coordinates || [latitude, longitude];

          mapRef.current = new window.ymaps.Map(
            "outfitsMap",
            {
              center: coordinates,
              zoom: 9,
              controls: [],
            },
            {
              maxZoom: 9,
              minZoom: 9,
            }
          );

          const garmentsToDisplay = Object.values(
            data.recommendedOutfit.reduce(
              (res, garment) => ({
                ...res,
                [garment.bodyPartId]:
                  (res[garment.bodyPartId]?.layer ?? -1) < garment.layer
                    ? garment
                    : res[garment.bodyPartId],
              }),
              {}
            )
          );

          var outfitPlacemark = new window.ymaps.Placemark(
            coordinates,
            {},
            {
              iconLayout: "default#image",
              iconImageHref: getOutfitDataUrl(garmentsToDisplay),
              iconImageSize: [200, 200],
              iconImageOffset: [-100, -100],
            }
          );

          if (data.mostPopularOutift) {
            var statisticsAreaCircle = new window.ymaps.GeoObject({
              geometry: {
                type: "Circle",
                coordinates: coordinates,
                radius: STATISTICS_RADIUS_KM * 1000,
              },
            });
            mapRef.current.geoObjects.add(statisticsAreaCircle);
          }

          mapRef.current.geoObjects.add(outfitPlacemark);

          // mapRef.current.events.add("boundschange", onBoundsChange);
        },
        () => alert("You need to enable geolocation")
      );
    });
  }, []);

  // const onBoundsChange = (event) => {
  //   const oldZoom = event.get("oldZoom");
  //   const newZoom = event.get("newZoom");

  //   console.log(oldZoom, newZoom);

  //   if(newZoom > oldZoom){
  //     statisticsActions.getTodayStatistics(11, )
  //   }
  // };

  return <div id="outfitsMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ statistics: { data, waypoint } }) => ({
  data,
  waypoint,
});

export default connect(mapStateToProps, mapDispatchToProps)(OutfitsMap);
