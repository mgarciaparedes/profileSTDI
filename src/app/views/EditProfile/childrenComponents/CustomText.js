import React from "react";
import Swal from "sweetalert2";

export const CustomText = ({ socialMedia, CustomTextIcon, copyTextToClipboard }) => {
  const showText = (title, text) => {
    Swal.fire({
      title: title,
      html: "<div class='pre-wrap'>" + text + "</div>",
      confirmButtonText: "Copy text",
      showCancelButton: true,
      cancelButtonText: "Close",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        copyTextToClipboard(text);
        Swal.fire("Text copied to clipboard!", "", "success");
      } else if (result.isDenied) {
      }
    });
  };
  return (
    <>
      {socialMedia.map((elemento, index) => (
        <div key={index}>
          {elemento.socialNetwork === "CustomText" ? (
            <div className="row d-flex justify-content-center h5">
              <div
                className="border p-2 border-link col-10"
                onClick={() => showText(elemento.linkName, elemento.profile)}
              >
                {/* <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                > */}
                <div className="d-flex col-lg-12 justify-content-center pt-2 pb-1">
                  <img
                    className="filter-grey"
                    width="25"
                    height="25"
                    src={CustomTextIcon}
                    alt="CustomText"
                  />
                  &nbsp;
                  {elemento.linkName}
                </div>
                {/* </a> */}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};
