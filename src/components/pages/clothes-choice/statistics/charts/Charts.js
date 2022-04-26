import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from "victory";
import { BODY_PARTS_NAMES } from "../../../../../constants";

const SHOW_TOP_AMOUNT = 10;

const Charts = ({ outfits }) => {
  const [selectedBodyPartId, setSelectedBodyPartId] = useState(null);

  const isDataEmpty = !outfits || !Object.keys(outfits).length;

  const garments = useMemo(
    () => (isDataEmpty ? [] : Object.values(outfits).flat()),
    [outfits]
  );
  const bodyPartsIds = useMemo(
    () =>
      garments
        .map(({ bodyPartId }) => bodyPartId)
        .reduce(
          (res, bodyPartId) =>
            res.includes(bodyPartId) ? res : [...res, bodyPartId],
          []
        ),
    [garments]
  );

  useEffect(() => {
    setSelectedBodyPartId(bodyPartsIds[0]);
  }, [bodyPartsIds]);

  const chartData = useMemo(
    () =>
      Object.entries(
        garments
          .filter(({ bodyPartId }) => bodyPartId === selectedBodyPartId)
          .reduce(
            (res, garment) => ({
              ...res,
              [garment.id]:
                res[garment.id] ??
                garments.filter(({ id }) => id === garment.id).length,
            }),
            {}
          )
      )
        .sort(([, countA], [, countB]) => countA - countB)
        .slice(0, SHOW_TOP_AMOUNT)
        .map(([garmentId, count], index) => {
          const garment = garments.find(({ id }) => id === +garmentId);

          return { y: count, x: index + 1, label: garment.naming };
        }),
    [selectedBodyPartId, garments]
  );

  return isDataEmpty ? (
    <p className="text-center pt-3">Nothing to show...</p>
  ) : (
    <div className="h-100 p-3">
      <div class="dropdown dropright">
        <button
          class="btn dropdown-toggle"
          type="button"
          id="statisticsBodyPartDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Body part
        </button>
        <div class="dropdown-menu" aria-labelledby="statisticsBodyPartDropdown">
          {bodyPartsIds.map((bodyPartId) => (
            <button
              class={classNames("dropdown-item", {
                active: selectedBodyPartId === bodyPartId,
              })}
              type="button"
              onClick={() => setSelectedBodyPartId(bodyPartId)}
            >
              {BODY_PARTS_NAMES[bodyPartId]}
            </button>
          ))}
        </div>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: [30, 60] }}
      >
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          barWidth={20}
          alignment="start"
          data={chartData}
          labelComponent={
            <VictoryLabel
              angle={90}
              textAnchor="end"
              verticalAnchor="middle"
              dx={-10}
              dy={-12}
              style={{ fontSize: 18 }}
            />
          }
        />
        <VictoryAxis tickValues={chartData.map(({ x }) => x)} />
        <VictoryAxis
          dependentAxis
          tickValues={chartData.reduce(
            (res, { y }) => (res.includes(y) ? res : [...res, y]),
            []
          )}
        />
      </VictoryChart>
    </div>
  );
};

const mapStateToProps = ({ statistics: { data } }) => ({
  outfits: data?.outfits,
});

export default connect(mapStateToProps)(Charts);
