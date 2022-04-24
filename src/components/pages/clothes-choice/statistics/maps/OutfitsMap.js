import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
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

          mapRef.current = new window.ymaps.Map("outfitsMap", {
            center: waypoint?.coordinates || [latitude, longitude],
            zoom: 9,
            controls: [],
          });

          const garmentsToDisplay = Object.values(
            data.mostPopularOutfit.reduce(
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

          console.log(data.mostPopularOutfit, garmentsToDisplay);

          var outfitPlacemark = new window.ymaps.Placemark(
            waypoint?.coordinates || [latitude, longitude],
            {},
            {
              iconLayout: "default#image",
              iconImageHref: getOutfitDataUrl(garmentsToDisplay),
              iconImageSize: [200, 200],
              iconImageOffset: [-100, -100],
            }
          );

          mapRef.current.geoObjects.add(outfitPlacemark);
        },
        () => alert("You need to enable geolocation")
      );
    });
  }, []);

  return <div id="outfitsMap" className="w-100 h-100"></div>;
};

const mapStateToProps = ({ statistics: { data, waypoint } }) => ({
  data,
  waypoint,
});

export default connect(mapStateToProps, mapDispatchToProps)(OutfitsMap);
