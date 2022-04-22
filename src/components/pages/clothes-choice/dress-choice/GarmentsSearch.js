import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { BODY_PARTS, GARMENT_SEX } from "../../../../constants";

import ArrowDownImg from "../../../../images/arrow-down.svg";

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
};

const GarmentsSearch = ({ garments, toggleWardrobe }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASCENDING);
  const [filterType, setFilterType] = useState(null);
  const [isWardrobe, setIsWardrobe] = useState(false);

  const processedGarments = useMemo(() => {
    const filteredGarments = garments.filter(
      ({ bodyPartId, isOwned }) =>
        (filterType ? bodyPartId === filterType : true) &&
        isOwned === isWardrobe
    );

    if (sortField) {
      return filteredGarments.sort((garmentA, garmentB) =>
        sortDirection === SORT_DIRECTIONS.ASCENDING
          ? garmentA[sortField] - garmentB[sortField]
          : garmentB[sortField] - garmentA[sortField]
      );
    }

    return filteredGarments;
  }, [garments, filterType, sortField, sortDirection, isWardrobe]);

  return (
    <div className="garments-search d-flex flex-column h-100 border-left border-primary">
      <div className="d-flex border-bottom border-primary pr-3">
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
        <div className="col-4 d-flex justify-content-center align-items-center p-2">
          <label className="mb-0 pl-0" htmlFor="isWardrobe">
            Wardrobe:
          </label>
          <input
            type="checkbox"
            class=" ml-2"
            id="isWardrobe"
            checked={isWardrobe}
            onChange={() => setIsWardrobe(!isWardrobe)}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap flex-grow-1 overflow-y-auto align-content-start">
        {processedGarments.length ? (
          processedGarments.map((garment, index) => {
            const {
              id,
              naming,
              imageData,
              saveData,
              clo,
              layer,
              sex,
              bodyPartId,
              isOwned,
            } = garment;

            return (
              <div
                className={classNames(
                  "garment d-flex justify-content-center align-items-center col-4 px-0 h-50 border-bottom border-primary",
                  {
                    "border-right": (index + 1) % 3,
                  }
                )}
              >
                <img src={imageData} className="h-75 w-75" />
                <button
                  className="btn btn-primary rounded position-absolute"
                  style={{ right: "5%", top: "5%" }}
                  onClick={() => toggleWardrobe(!isOwned, id)}
                >
                  {isOwned ? "-" : "+"}
                </button>
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
