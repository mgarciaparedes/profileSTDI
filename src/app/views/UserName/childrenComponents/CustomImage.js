import React, { useState } from "react";
import { Carousel, Modal, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import * as Icon from "react-bootstrap-icons";

export const CustomImage = ({ customImage, CustomImageIcon }) => {
  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalArrayImages, setModalArrayImages] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [index2, setIndex2] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex2(selectedIndex);
  };

  //   const showCustomImage = (title, array) => {
  //     Swal.fire({
  //       title: title,
  //       html:
  //         "<Carousel>" +
  //         array.map((index,elemento) => {
  //             return "<Carousel.Item><img src='"+ `${process.env.REACT_APP_API_URL}/render/image/${elemento.image}` +"' />";
  //         })
  //         +"  </Carousel>",
  //       text: "Click in the icon",
  //       confirmButtonText: "Close",
  //     });
  //   };
  return (
    <>
      {customImage.map((elemento, index) => (
        <div key={index}>
          {elemento.customImageActive === true ? (
            <div className="row d-flex justify-content-center h5">
              <div className="border p-2 border-link col-10">
                {/* <a
                  className="btn-no-style"
                  target="_blank"
                  href={elemento.profile}
                > */}
                <div
                  className="d-flex col-lg-12 justify-content-center"
                  onClick={() => {
                    // showCustomImage(
                    //   elemento.customImageButtonName,
                    //   elemento.arrayWithImagesURL
                    // )
                    handleShow();
                    setModalTitle(elemento.customImageButtonName);
                    setModalArrayImages(elemento.arrayWithImagesURL);
                  }}
                >
                  <img
                      //style={{ marginTop: "6px" }}
                      className="pb-1"
                      width="25"
                      height="25"
                      src={CustomImageIcon}
                      alt="CustomURL"
                    />
                  &nbsp;
                  {elemento.customImageButtonName}
                </div>
                {/* </a> */}
              </div>
            </div>
          ) : null}
        </div>
      ))}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 m-auto">
                {/* <Alert variant="info">
                  <Icon.InfoCircleFill className="mb-1" size={20} /> &nbsp;
                  Please read the following info where we explain what does this
                  mean.
                </Alert> */}
                <Carousel activeIndex={index2} onSelect={handleSelect}>
                  {modalArrayImages.map((elemento, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={`${process.env.REACT_APP_API_URL}/render/image/${elemento.image}`}
                        alt="First slide"
                      />

                      <Carousel.Caption>
                        <Button
                          variant="light"
                          onClick={() =>
                            window.open(
                              `${process.env.REACT_APP_API_URL}/render/image/${elemento.image}`
                            )
                          }
                        >
                         Open in another tab
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="col-lg-12">
          <Button
            variant="light"
            onClick={() => {
              handleClose();
              setModalTitle(false);
              setModalArrayImages([]);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
