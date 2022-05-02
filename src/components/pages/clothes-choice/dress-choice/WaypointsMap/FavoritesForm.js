import React, { useMemo, useState } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../../../store/actions";
import HouseImg from "../../../../../images/house.svg";
import PlacemarkImg from "../../../../../images/placemark.svg";
import { compareLocations } from "../../../../../utils";

const FavoritesForm = ({ locations, waypoints, dressChoiceActions }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onSelect = (latitude, longitude, naming) => {
    dressChoiceActions.selectFavorite(latitude, longitude, naming);
  };

  const notSelectedFavorites = useMemo(
    () =>
      locations.filter(
        ({ latitude, longitude }) =>
          !waypoints.some(({ coordinates }) =>
            compareLocations([latitude, longitude], coordinates)
          )
      ),
    [locations, waypoints]
  );

  return (
    <>
      <button
        className="position-absolute btn btn-primary"
        style={{ right: isVisible ? "27%" : "5%", top: "2%" }}
      >
        <img
          src={HouseImg}
          onClick={() => setIsVisible(!isVisible)}
          style={{ width: "3rem", height: "3rem" }}
        />
      </button>
      {isVisible && (
        <div
          className="position-absolute w-25 h-50 overflow-y-auto bg-light-blue border-left border-bottom border-primary py-3"
          style={{ right: 0, top: 0, borderRadius: "0 0 0 1rem" }}
        >
          {notSelectedFavorites.length ? (
            notSelectedFavorites.map(({ id, latitude, longitude, naming }) => (
              <div
                key={id}
                className="d-flex align-items-center border-bottom border-primary p-2 cursor-pointer bg-primary-on-hover"
                onClick={() => onSelect(latitude, longitude, naming)}
              >
                <img src={PlacemarkImg} style={{ height: "2.5rem" }} />
                <span>{naming}</span>
              </div>
            ))
          ) : (
            <p className="text-center">No favorites yet...</p>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({
  user: { locations },
  dressChoice: { waypoints },
}) => ({
  locations,
  waypoints,
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesForm);
