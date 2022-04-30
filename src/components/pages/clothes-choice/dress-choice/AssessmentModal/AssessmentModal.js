import React, { useEffect, useState } from "react";
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
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [displayLayer, setDisplayLayer] = useState(1);

  useEffect(() => {
    if (assessment) {
      $("#assessmentModal").modal("show");
    } else {
      $("#assessmentModal").modal("hide");
      setCurrentOutfit(null);
      return;
    }

    const { recomendations } = assessment;

    if (recomendations?.length) {
      setCurrentOutfit(recomendations[0]);
    } else {
      setCurrentOutfit(null);
    }
  }, [assessment]);

  const onCancel = () => {
    $("#assessmentModal").modal("hide");
  };

  const onSubmit = () => {
    $("#assessmentModal").modal("hide");
    dressChoiceActions.setSelectedGarments(currentOutfit);
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
            {currentOutfit ? (
              <div className="d-flex w-100 overflow-hidden">
                <img className="col-6" src={getOutfitDataUrl(currentOutfit)} />
                <OutfitView
                  modifyOutfit={false}
                  displayLayer={displayLayer}
                  setDisplayLayer={setDisplayLayer}
                  selectedGarments={currentOutfit}
                />
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
