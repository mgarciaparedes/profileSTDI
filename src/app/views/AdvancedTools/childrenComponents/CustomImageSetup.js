import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik, yupToFormErrors } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";
import FormData from "form-data";

function CustomImageSetup() {
  const { objLogin, setGalleryActiveContext, setGalleryImageContext } =
    useContext(AppContext);
  const [customImage, setCustomImage] = useState([]);
  const galleryImages = objLogin.galleryImages;
  const [saveCustomImageButton, setSaveCustomImageButton] = useState(false);
  const [filesLength, setFilesLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [galleryActive, setGalleryActive] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    for (var i = 0; i < customImage.length; i++) {
      if (
        customImage[i].type === "image/jpeg" ||
        customImage[i].type === "image/jpg" ||
        customImage[i].type === "image/png"
      ) {
        setIsValidFile(true);
      } else {
        setIsValidFile(false);
      }
    }
  }, [customImage]);

  const schema = Yup.object().shape({
    attachedDocument: Yup.mixed().required("At least one file is required"),
    customImageButtonName: Yup.string()
      .required("Button name required")
      .max(40, "Text too large")
      .min(3, "At least 3 characters are required"),
  });

  const activateGallery = (e) => {
    // setGalleryActive(e.target.checked);
    // setGalleryActiveContext(e.target.checked);
    // setGalleryActivateOnDataBase(e.target.checked);
  };

  const setGalleryActivateOnDataBase = (value) => {
    // setLoading(true);
    // const payload = {
    //   galleryActive: value,
    // };
    // axios
    //   .post("/users/activateGallery", payload)
    //   .then((res) => {
    //     //console.log(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //   });
  };

  const saveCustomImage = (event) => {
    setSaveCustomImageButton(true);
    if (!isValidFile) {
      setSaveCustomImageButton(false);
      Swal.fire({
        title: "Error",
        text: "Format files must be .jpg, .jpeg or .png",
        icon: "error",
        confirmButtonText: "Try again",
      });
    } else {
    //   //aquí comparo si el usuario ya tiene una galería previamente registrada
    //   //si gallery viene como null, quiere decir que no hay registros y se porcerá a usar el servicio saveNewGallery
    //   //por el contrario, si tiene ya registros, solo se deberá modificar el registro que ya tiene guardado.
    //   if (galleryImages !== null) {
    //     let formData2 = new FormData();
    //     formData2.append("galleryActive", objLogin.galleryActive);
    //     for (var x = 0; x < gallery.length; x++) {
    //       formData2.append("galleryImages", gallery[x]);
    //     }
    //     axios
    //       .post("/users/updateGallery", formData2, {
    //         headers: {
    //           "content-type": "multipart/form-data",
    //         },
    //       })
    //       .then((res) => {
    //         setSaveCustomImageButton(false);
    //         const { ok, msg } = res.data;
    //         if (ok && msg === "Gallery updated succesfully.") {
    //           Swal.fire({
    //             title: "Process succesfully",
    //             text: msg,
    //             icon: "success",
    //             confirmButtonText: "Ok",
    //           });
    //           handleClose();
    //           document.getElementById("attachedDocument").value = "";
    //           setFilesLength(0);
    //         } else {
    //           Swal.fire({
    //             title: "Error",
    //             text: msg,
    //             icon: "error",
    //             confirmButtonText: "Try again",
    //           });
    //         }
    //       })
    //       .catch((error) => {
    //         setSaveCustomImageButton(false);
    //         Swal.fire({
    //           title: "Error",
    //           text: "We are sorry, an error occurred.",
    //           icon: "error",
    //           confirmButtonText: "Try again",
    //         });
    //       });
    //   } else {
        let formData = new FormData();
        formData.append("customImageActive", true);
        formData.append("customImageButtonName", event.customImageButtonName);
        for (var x = 0; x < customImage.length; x++) {
          formData.append("customImage", customImage[x]);
        }
        axios
          .post("/users/saveNewCustomImage", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setSaveCustomImageButton(false);
            const { ok, msg, event } = res.data;
            if (ok && msg === "Custom Image created succesfully.") {
              Swal.fire({
                title: "Process succesfully",
                text: msg,
                icon: "success",
                confirmButtonText: "Ok",
              });
              const { galleryImages } = event;
              handleClose();
            //   setGalleryActive(true);
            //   setGalleryActiveContext(true);
            //   setGalleryImageContext(galleryImages);
              document.getElementById("attachedDocument").value = "";
              setFilesLength(0);
            } else {
              Swal.fire({
                title: "Error",
                text: msg,
                icon: "error",
                confirmButtonText: "Try again",
              });
            }
          })
          .catch((error) => {
            setSaveCustomImageButton(false);
            Swal.fire({
              title: "Error",
              text: "we are sorry, an error occurred.",
              icon: "error",
              confirmButtonText: "Try again",
            });
          });
      }
    // }
  };

  return (
    <div className="mt-3">
      {loading ? <SpinnerLoading /> : null}
      <label className="font-weight-bold">Set up Custom Images:</label>
      {/* <InputGroup>
        <Form.Check
          type="switch"
          name="galleryActive"
          id="custom-switch-gallery-active"
          label={
            galleryActive ? (
              <b className="text-success"> Enabled </b>
            ) : (
              <b className="text-warning"> Disabled </b>
            )
          }
          checked={galleryActive === true ? true : false}
          onChange={(e) => {
            activateGallery(e);
          }}
        />
      </InputGroup> */}
      <Button variant="light" className="mt-1" onClick={handleShow}>
        Click here to begin the steps
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Formik
          validationSchema={schema}
          onSubmit={saveCustomImage}
          initialValues={{
            attachedDocument: "",
            customImageButtonName: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              name="addServiceData"
              id="addServiceData"
            >
              <Modal.Header>
                <Modal.Title>
                  <Icon.Images className="mb-1" /> Set up Custom Image 1:
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 m-auto">
                      <Alert variant="info">
                        <Icon.InfoCircleFill className="mb-1" /> &nbsp; You need
                        to choose at once the pictures you might set into your
                        custom image 1.
                      </Alert>
                      {/*<p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p> */}

                      <Form.Group controlId="formFileMultiple">
                        <InputGroup className="mb-2">
                          <Form.Control
                            type="text"
                            placeholder="Tap here your button text"
                            name="customImageButtonName"
                            value={values.customImageButtonName}
                            onChange={handleChange}
                            isValid={
                              !!touched.customImageButtonName &&
                              !errors.customImageButtonName
                            }
                            isInvalid={
                              !!errors.customImageButtonName &&
                              !!touched.customImageButtonName
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.customImageButtonName}
                          </Form.Control.Feedback>
                        </InputGroup>

                        <Form.File custom>
                          <Form.File.Input
                            multiple
                            id="attachedDocument"
                            name="attachedDocument"
                            onChange={(e) => {
                              handleChange(e);
                              setFilesLength(e.target.files.length);
                              setCustomImage(e.target.files);
                              console.log(e.target.files);
                            }}
                            isValid={
                              !!touched.attachedDocument &&
                              !errors.attachedDocument
                            }
                            // isValid={
                            //   !!touched.attachedDocument && isValidFile === true
                            // }
                            isInvalid={
                              !!touched.attachedDocument &&
                              !!errors.attachedDocument
                            }
                          />

                          <Form.File.Label data-browse="Seleccionar">
                            {filesLength > 0
                              ? filesLength === 1
                                ? filesLength + " file selected"
                                : filesLength + " files selected"
                              : "Select files..."}
                          </Form.File.Label>

                          <Form.Control.Feedback type="invalid">
                            {errors.attachedDocument}
                          </Form.Control.Feedback>
                        </Form.File>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="col-lg-12">
                <Button
                  variant="light"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saveCustomImageButton === true}
                  // onClick={() => {
                  //   saveGallery();
                  // }}
                >
                  <div className="d-flex d-inline-block justify-content-center">
                    <span
                      className="spinner-border spinner-border-sm mt-1 mr-2"
                      role="status"
                      style={{
                        display:
                        saveCustomImageButton === true ? "inline-block" : "none",
                      }}
                      aria-hidden="true"
                    ></span>
                    {saveCustomImageButton === true
                      ? " Loading, please wait..."
                      : "Save Custom Image"}
                  </div>
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

export default CustomImageSetup;
