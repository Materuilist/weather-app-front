import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import mapDispatchToProps from "../../../store/actions";

const getHoursMinutesString = (hours) => {
  return `${hours < 10 ? "0" + hours : hours}:00`;
};

const ParametersForm = ({
  selectedGarments,
  waypointsData,
  dressChoiceActions,
}) => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(new Date().getHours() + 1);

  const onSubmit = () => {
    dressChoiceActions.getWeather(moment(date).toDate(), time);
  };

  const isSubmitDisaabled =
    !selectedGarments.length ||
    waypointsData.some(
      ({ activity, addToFavorites, naming }) =>
        !activity || (addToFavorites && !naming)
    );

  return (
    <div className="d-flex h-100 align-items-center">
      <input
        className="form-control col-2"
        type="date"
        value={date}
        onChange={({ target: { value } }) => setDate(value)}
        min={moment().format("YYYY-MM-DD")}
        max={moment().add(1, "days").format("YYYY-MM-DD")}
      />
      <div className="col-3 d-flex align-items-center">
        <span className="mr-3">{getHoursMinutesString(time)}</span>
        <input
          className=""
          type="range"
          value={time}
          min={0}
          max={24}
          step={1}
          onChange={({ target: { value } }) => setTime(+value)}
        />
      </div>
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
        disabled={isSubmitDisaabled}
        onClick={onSubmit}
      >
        Go
      </button>
    </div>
  );
};

const mapStateToProps = ({
  dressChoice: { selectedGarments, waypointsData },
}) => ({
  selectedGarments,
  waypointsData,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParametersForm);
