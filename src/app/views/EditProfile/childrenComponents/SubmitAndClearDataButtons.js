import React from "react";
import * as Icon from "react-bootstrap-icons";
import { InputGroup, Button } from "react-bootstrap";

function SubmitAndClearDataButtons({
    disabledButton,
    onSubmit,
    clearData,
}) {
  return (
    <>
    <hr className="hr mt-3" />
      <div className="mt-3">
        <InputGroup className="mb-2">
          <Button
            variant="primary"
            disabled={disabledButton === true}
            onClick={() => onSubmit()}
            block
          >
            <div className="d-flex d-inline-block justify-content-center">
              <span
                className="spinner-border spinner-border-sm mt-1 mr-2"
                role="status"
                style={{
                  display: disabledButton === true ? "inline-block" : "none",
                }}
                aria-hidden="true"
              ></span>
              {disabledButton === true ? (
                " Loading, please wait..."
              ) : (
                <>
                  <Icon.PersonLinesFill className="mt-1" />
                  &nbsp;&nbsp;
                  <span>Save Changes</span>
                </>
              )}
            </div>
          </Button>
        </InputGroup>
      </div>

      <div>
        <InputGroup className="mb-2">
          <Button
            type="button"
            variant="danger"
            onClick={() => clearData()}
            block
          >
            <div className="d-flex d-inline-block justify-content-center">
              <Icon.BackspaceFill className="mt-1" />
              &nbsp;&nbsp;
              <span>Clear Data</span>
            </div>
          </Button>
        </InputGroup>
      </div>
    </>
  );
}

export default SubmitAndClearDataButtons;
