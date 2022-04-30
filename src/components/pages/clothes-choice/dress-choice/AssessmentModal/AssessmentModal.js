import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import OutfitRepresentation from "../../../../shared/OutfitRepresentation/OutfitRepresentation";
import OutfitView from "../OutfitView";
import mapDispatchToProps from "../../../../../store/actions";
import { getOutfitDataUrl } from "../../../../../utils";

const VIABLE_DIFF = 0.1;
const SUCCESS_MESSAGE = "Great! Your outfit fits the weather perfectly.";
const FAIL_MESSAGE = "Oops... Probably, you need to fix your outfit...";

const AssessmentModal = ({ assessment, dressChoiceActions }) => {
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(null);
  const [displayLayer, setDisplayLayer] = useState(1);

  useEffect(() => {
    if (assessment) {
      $("#assessmentModal").modal("show");
    } else {
      $("#assessmentModal").modal("hide");
      setCurrentOutfitIndex(null);
      return;
    }

    const { recomendations } = assessment;

    if (recomendations?.length) {
      setCurrentOutfitIndex(0);
    } else {
      setCurrentOutfitIndex(null);
    }
  }, [assessment]);

  const overallOutfit = useMemo(
    () =>
      assessment?.recomendations?.[currentOutfitIndex]
        ? Object.values(
            assessment.recomendations[currentOutfitIndex].reduce(
              (res, garment) => ({
                ...res,
                [garment.bodyPartId]:
                  (res[garment.bodyPartId]?.layer ?? -1) < garment.layer
                    ? garment
                    : res[garment.bodyPartId],
              }),
              {}
            )
          )
        : null,
    [assessment, currentOutfitIndex]
  );

  const onCancel = () => {
    $("#assessmentModal").modal("hide");
  };

  const onSubmit = () => {
    $("#assessmentModal").modal("hide");
    dressChoiceActions.setSelectedGarments(
      assessment.recomendations[currentOutfitIndex]
    );
  };

  const isOutfitOk = Math.abs(assessment?.meanEstimation - 1) < VIABLE_DIFF;

  const getEstimationMessage = () => {
    const cloDiff = Math.round((assessment?.meanEstimation - 1) * 100);

    return isOutfitOk
      ? `Your outfit is almost fine and ${
          cloDiff > 0 ? "warmer" : "colder"
        } than needed by only ${Math.abs(cloDiff)}%`
      : `You need to ${
          cloDiff > 0 ? "ease" : "insulate"
        } your outfit by ${Math.abs(cloDiff)} %`;
  };

  const navigaterOutfit = (step) => {
    const newIndex = currentOutfitIndex + step;

    if (newIndex < 0 || !assessment.recomendations[newIndex]) {
      return;
    }

    setCurrentOutfitIndex(newIndex);
  };

  return (
    <div id="assessmentModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" style={{ maxWidth: "60vw" }}>
        <div class="modal-content h-100">
          <div class="modal-header">
            <h5 class="modal-title">
              {isOutfitOk ? SUCCESS_MESSAGE : FAIL_MESSAGE}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex flex-column height-60-vh">
            <p>{getEstimationMessage()}</p>
            {!isOutfitOk && (
              <p>
                Probably, you could select from one of the recommended outfits:
              </p>
            )}
            {currentOutfitIndex != null ? (
              <div className="d-flex w-100 overflow-hidden">
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="triangle triangle-left opacity-70-on-hover cursor-pointer"
                    onClick={() => navigaterOutfit(-1)}
                  ></div>
                </div>
                <img className="col-5" src={getOutfitDataUrl(overallOutfit)} />
                <div className="flex-grow-1">
                  <OutfitView
                    modifyOutfit={false}
                    displayLayer={displayLayer}
                    setDisplayLayer={setDisplayLayer}
                    selectedGarments={
                      assessment.recomendations[currentOutfitIndex]
                    }
                  />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div
                    className="triangle triangle-right opacity-70-on-hover cursor-pointer"
                    onClick={() => navigaterOutfit(1)}
                  ></div>
                </div>
              </div>
            ) : (
              <p>Sorry, didn't manage to form recommendations</p>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={onCancel}
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={onSubmit}>
              Select outfit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ dressChoice: { assessment } }) => ({
  assessment,
});

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentModal);
