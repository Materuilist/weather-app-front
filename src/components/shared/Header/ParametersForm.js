import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/actions";
import Loader from "../Loader/Loader";
import { Route } from "react-router-dom";
import { CLOTHES_CHOICE_ROUTES, STATISTICS_TYPES } from "../../../constants";

const getHoursMinutesString = (hours) => {
  return `${hours < 10 ? "0" + hours : hours}:00`;
};

const getStatisticsType = (pathname) => {
  return +pathname.match(/\/clothes-choice\/statistics\/(?<type>\d>*)/)?.groups
    ?.type;
};

const ParametersForm = ({
  selectedGarments,
  waypointsData,
  statisticsWaypoint,
  statisticsData,
  dressChoiceActions,
  statisticsActions,
  location: { pathname },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(new Date().getHours() + 1);
  const [activity, setActivity] = useState(10);
  const [radius, setRadius] = useState(50);

  const statisticsType = getStatisticsType(pathname);

  const onSubmit = () => {
    let isActualDate = true;
    let validTime = time;

    if (
      !statisticsType ||
      [STATISTICS_TYPES.USUALLY, STATISTICS_TYPES.FORECAST].includes(
        statisticsType
      )
    ) {
      isActualDate = new Date(date).getDate() === new Date().getDate();
    }

    if (isActualDate) {
      const actualHour = new Date().getHours();
      if (actualHour > time) {
        validTime = actualHour;
        setTime(validTime);
      }
    }

    setIsLoading(true);

    if (statisticsType) {
      switch (statisticsType) {
        case STATISTICS_TYPES.TODAY:
          return statisticsActions.getTodayStatistics(validTime, radius, () =>
            setIsLoading(false)
          );
        case STATISTICS_TYPES.USUALLY:
          return statisticsActions.getAllTimeStatistics(
            moment(date).toDate(),
            validTime,
            radius,
            () => setIsLoading(false)
          );
        case STATISTICS_TYPES.FORECAST:
          return statisticsActions.getRecomendation(
            moment(date).toDate(),
            validTime,
            activity,
            () => setIsLoading(false)
          );
        default:
          return;
      }
    } else {
      dressChoiceActions.getWeather(moment(date).toDate(), validTime, () =>
        setIsLoading(false)
      );
    }
  };

  const isSubmitDisabled =
    statisticsType === STATISTICS_TYPES.TODAY ||
    statisticsType === STATISTICS_TYPES.USUALLY ||
    statisticsType === STATISTICS_TYPES.FORECAST
      ? (statisticsData && Object.keys(statisticsData).length) ||
        !statisticsWaypoint
      : !selectedGarments.length ||
        waypointsData.some(
          ({ addToFavorites, naming }) => addToFavorites && !naming
        );

  return (
    <div className="d-flex h-100 align-items-center">
      <Loader isLoading={isLoading} />
      {[STATISTICS_TYPES.USUALLY, STATISTICS_TYPES.FORECAST].includes(
        statisticsType
      ) && (
        <input
          className="form-control col-2"
          type="date"
          value={date}
          onChange={({ target: { value } }) => setDate(value)}
          min={moment().format("YYYY-MM-DD")}
          max={moment().add(1, "days").format("YYYY-MM-DD")}
        />
      )}
      <div className="col-3 d-flex align-items-center">
        <span className="mr-3">{getHoursMinutesString(time)}</span>
        <input
          className="col"
          type="range"
          value={time}
          min={0}
          max={24}
          step={1}
          onChange={({ target: { value } }) => setTime(+value)}
        />
      </div>
      {[STATISTICS_TYPES.USUALLY, STATISTICS_TYPES.TODAY].includes(
        statisticsType
      ) && (
        <div className="col-4 d-flex align-items-center">
          <span className="ml-1 mr-1">Radius:</span>
          <span className="ml-1 mr-3">{radius} km</span>
          <input
            className="col"
            type="range"
            value={radius}
            onChange={({ target: { value } }) => setRadius(+value)}
            min={50}
            max={100}
          />
        </div>
      )}
      {statisticsType === STATISTICS_TYPES.FORECAST && (
        <div className="col-3 d-flex align-items-center">
          <span className="ml-3">Activity:</span>
          <span className="ml-1 mr-3">{activity}%</span>
          <input
            className=""
            type="range"
            value={time}
            min={0}
            max={100}
            step={1}
            onChange={({ target: { value } }) => setActivity(+value)}
          />
        </div>
      )}
      {/* <div className="col-6 d-flex">
        <div
          className={classNames("btn rounded mr-2 border border-primary col", {
            "btn-primary": sex,
          })}
          onClick={() => setSex(!sex)}
        >
          Male
        </div>
        <div
          className={classNames("btn rounded border border-primary col", {
            "btn-primary": !sex,
          })}
          onClick={() => setSex(!sex)}
        >
          Female
        </div>
      </div> */}
      <button
        className="btn btn-primary rounded text-uppercase ml-auto"
        disabled={isSubmitDisabled}
        onClick={onSubmit}
      >
        Go
      </button>
    </div>
  );
};

const mapStateToProps = ({
  dressChoice: { selectedGarments, waypointsData },
  statistics: { waypoint: statisticsWaypoint, data: statisticsData },
  router: { location },
}) => ({
  selectedGarments,
  waypointsData,
  location,
  statisticsWaypoint,
  statisticsData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParametersForm);
