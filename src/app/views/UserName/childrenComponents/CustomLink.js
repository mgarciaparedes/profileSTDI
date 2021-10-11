import React from "react";
import Swal from "sweetalert2";

export const CustomLink = ({ socialMedia, CustomURLIcon }) => {
  const showModal = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you clear your profile it will be empty.",
      icon: "info",
      confirmButtonText: "Yes, wipe out",
      showCancelButton: true,
      cancelButtonText: "No, go back",
    })
  }
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
                  <div className="d-flex col-lg-12 justify-content-center">
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
