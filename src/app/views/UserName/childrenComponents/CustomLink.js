import React from "react";

export const CustomLink = ({ socialMedia, CustomURLIcon }) => {
  return (
    <>
      {socialMedia.map((elemento, index) => (
        <>
          {elemento.socialNetwork === "CustomURL" ? (
            <div className="row d-flex justify-content-center h5">
              <div key={index} className="border p-2 border-link col-10">
                <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                >
                  <div className="d-flex col-lg-12 justify-content-center">
                    <img
                      className="mt-1"
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
        </>
      ))}
    </>
  );
};
