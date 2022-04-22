import React, { useState } from "react";
import moment from "moment";
import classNames from "classnames";

const getHoursMinutesString = (minutes) => {
  const hoursPart = parseInt(minutes / 60);
  const minutesPart = minutes - hoursPart * 60;

  return `${hoursPart < 10 ? "0" + hoursPart : hoursPart}:${
    minutesPart < 10 ? "0" + minutesPart : minutesPart
  }`;
};

const ParametersForm = () => {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [time, setTime] = useState(30);
  const [sex, setSex] = useState(true);

  return (
    <div className="d-flex h-100 align-items-center">
      <input
        className="form-control col-2"
        type="date"
        value={date}
        onChange={({ target: { value } }) => setDate(value)}
      />
      <div className="col-3 d-flex align-items-center">
        <span className="mr-3">{getHoursMinutesString(time)}</span>
        <input
          className="form-control"
          type="range"
          value={time}
          min={30}
          max={1440}
          step={30}
          onChange={({ target: { value } }) => setTime(+value)}
        />
      </div>
      <div className="col-6 d-flex">
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
      </div>
      <button className="btn btn-primary rounded text-uppercase ml-auto">
        Go
      </button>
    </div>
  );
};

export default ParametersForm;
