import React from "react";

export const CustomLink = ({ socialMedia, CustomURLIcon }) => {
  return (
    <>
      {socialMedia.map((elemento, index) => (
        <div key={index}>
          {elemento.socialNetwork === "CustomURL" ? (
            <div className="row d-flex justify-content-center h5">
              <div className="border p-2 border-link col-10">
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="d-flex col-lg-12 justify-content-center font-bold text-uppercase
                  ">
                    <img
                      style={{ marginTop: "6px" }}
                      width="25"
                      height="25"
                      src={CustomURLIcon}
                      alt="CustomURL"
                    />
                    &nbsp;
                    {elemento.linkName}
                  </div>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};
