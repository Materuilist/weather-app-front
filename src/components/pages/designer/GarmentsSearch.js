import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { BODY_PARTS, GARMENT_SEX } from "../../../constants";

import ArrowDownImg from "../../../images/arrow-down.svg";

const SORT_FIELDS = {
  LAYER: "layer",
  CLO: "clo",
};
const SORT_DIRECTIONS = {
  ASCENDING: 1,
  DESCENDING: 2,
};
const FILTER_OPTIONS = {
  TYPE: BODY_PARTS,
  SEX: GARMENT_SEX,
};

const GarmentsSearch = ({ garments, garmentDraft, setGarmentDraft }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASCENDING);
  const [filterType, setFilterType] = useState(null);
  const [filterSex, setFilterSex] = useState(null);

  const processedGarments = useMemo(() => {
    const filteredGarments = garments.filter(
      ({ bodyPartId, sex }) =>
        (filterType ? bodyPartId === filterType : true) &&
        (filterSex ? sex === filterSex : true)
    );

    if (sortField) {
      return filteredGarments.sort((garmentA, garmentB) =>
        sortDirection === SORT_DIRECTIONS.ASCENDING
          ? garmentA[sortField] - garmentB[sortField]
          : garmentB[sortField] - garmentA[sortField]
      );
    }

    return filteredGarments;
  }, [garments, filterType, filterSex, sortField, sortDirection]);

  return (
    <div className="garments-search d-flex flex-column h-100 border-left border-primary">
      <div className="d-flex border-bottom border-primary">
        <div className="col-4 d-flex justify-content-center align-items-center border-right border-primary p-2">
          <div class="dropdown dropright">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort
            </button>
            <div class="dropdown-menu" aria-labelledby="sortDropdown">
              <button
                class={classNames("dropdown-item", {
                  active: sortField === SORT_FIELDS.LAYER,
                })}
                type="button"
                onClick={() =>
                  setSortField(
                    sortField === SORT_FIELDS.LAYER ? null : SORT_FIELDS.LAYER
                  )
                }
              >
                Layer
              </button>
              <button
                class={classNames("dropdown-item", {
                  active: sortField === SORT_FIELDS.CLO,
                })}
                type="button"
                onClick={() =>
                  setSortField(
                    sortField === SORT_FIELDS.CLO ? null : SORT_FIELDS.CLO
                  )
                }
              >
                Clo
              </button>
            </div>
          </div>
          <img
            src={ArrowDownImg}
            className={classNames("sort-icon ml-3", {
              reversed: sortDirection === SORT_DIRECTIONS.DESCENDING,
            })}
            onClick={() =>
              setSortDirection(
                sortDirection === SORT_DIRECTIONS.ASCENDING
                  ? SORT_DIRECTIONS.DESCENDING
                  : SORT_DIRECTIONS.ASCENDING
              )
            }
          />
        </div>
        <div className="col-4 d-flex justify-content-center border-right border-primary p-2">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="filterTypeDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Type
            </button>
            <div class="dropdown-menu" aria-labelledby="filterTypeDropdown">
              {Object.entries(FILTER_OPTIONS.TYPE).map(
                ([bodyPartName, bodyPartId]) => (
                  <button
                    class={classNames("dropdown-item", {
                      active: filterType === bodyPartId,
                    })}
                    type="button"
                    onClick={() =>
                      setFilterType(
                        filterType === bodyPartId ? null : bodyPartId
                      )
                    }
                  >
                    {bodyPartName}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center border-right border-primary p-2">
          <div class="dropdown dropleft">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="filterSexDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sex
            </button>
            <div class="dropdown-menu" aria-labelledby="filterSexDropdown">
              {Object.entries(FILTER_OPTIONS.SEX).map(([sexName, sexId]) => (
                <button
                  class={classNames("dropdown-item", {
                    active: filterSex === sexId,
                  })}
                  type="button"
                  onClick={() =>
                    setFilterSex(filterSex === sexId ? null : sexId)
                  }
                >
                  {sexName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap flex-grow-1 overflow-y-auto align-content-start">
        {processedGarments.length ? (
          processedGarments.map((garment) => {
            const {
              id,
              naming,
              imageData,
              saveData,
              clo,
              layer,
              sex,
              bodyPartId,
            } = garment;

            return (
              <div
                className={classNames(
                  "garment col-4 h-20 border-right border-bottom border-primary",
                  { selected: garmentDraft?.id === id }
                )}
              >
                <div
                  className="garment-info flex-column justify-content-around px-2"
                  onClick={
                    saveData
                      ? () =>
                          setGarmentDraft(
                            garmentDraft?.id === id ? null : garment
                          )
                      : null
                  }
                >
                  <p className="mb-0">Naming: {naming}</p>
                  <p className="mb-0">Clo: {clo}</p>
                  <p className="mb-0">Layer: {layer}</p>
                  <p className="mb-0">
                    Sex:{" "}
                    {sex === GARMENT_SEX.MALE
                      ? "M"
                      : sex === GARMENT_SEX.FEMALE
                      ? "F"
                      : "M/F"}
                  </p>
                </div>
                <img src={imageData} className="h-100 w-100" />
              </div>
            );
          })
        ) : (
          <p className="mx-auto mt-2">No garments found...</p>
        )}
      </div>
    </div>
  );
};

export default GarmentsSearch;
