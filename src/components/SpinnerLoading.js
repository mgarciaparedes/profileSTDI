import React from "react";
import logoImage from "../assets/images/logo-white.png";

export const SpinnerLoading = () => {
  return (
    <div className="container-loading text-white">
      <div className="overlay">
        <div className="d-flex justify-content-center">
          <img width="50" height="50" src={logoImage} />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <span
            className="spinner-border"
            role="status"
            style={{ "inlineBlock": "none" }}
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </div>
  );
};
