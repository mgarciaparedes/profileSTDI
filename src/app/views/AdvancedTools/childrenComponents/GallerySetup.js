import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";
import FormData from "form-data";

function GallerySetup() {
  const { objLogin, setGalleryActiveContext } = useContext(AppContext);
  const [gallery, setGallery] = useState([]);
  const galleryImages = objLogin.galleryImages;
  const [saveGalleryButton, setSaveGalleryButton] = useState(false);
  const [filesLength, setFilesLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [galleryActive, setGalleryActive] = useState(objLogin.galleryActive);
  const [isValidFile, setIsValidFile] = useState(false);

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    for (var i = 0; i < gallery.length; i++) {
      if (
        gallery[i].type === "image/jpeg" ||
        gallery[i].type === "image/jpg" ||
        gallery[i].type === "image/png"
      ) {
        setIsValidFile(true);
      } else {
        setIsValidFile(false);
      }
    }
  }, [gallery]);

  const schema = Yup.object().shape({
    attachedDocument: Yup.mixed().required("At least one file is required"),
  });

  const activateGallery = (e) => {
    setGalleryActive(e.target.checked);
    setGalleryActiveContext(e.target.checked);
    setGalleryActivateOnDataBase(e.target.checked);
  };

  const setGalleryActivateOnDataBase = (value) => {
    setLoading(true);
    const payload = {
      galleryActive: value,
    };

    axios
      .post("/users/activateGallery", payload)
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const saveGallery = () => {
    setSaveGalleryButton(true);

    if (!isValidFile) {
      setSaveGalleryButton(false);
      Swal.fire({
        title: "Error",
        text: "Format files must be .jpg, .jpeg or .png",
        icon: "error",
        confirmButtonText: "Try again",
      });
    } else {
      //aquí comparo si el usuario ya tiene una galería previamente registrada
      //si gallery viene como null, quiere decir que no hay registros y se porcerá a usar el servicio saveNewGallery
      //por el contrario, si tiene ya registros, solo se deberá modificar el registro que ya tiene guardado.
      if (galleryImages !== null) {
        let formData2 = new FormData();
        formData2.append("galleryActive", objLogin.galleryActive);
        for (var x = 0; x < gallery.length; x++) {
          formData2.append("galleryImages", gallery[x]);
        }

        axios
          .post("/users/updateGallery", formData2, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setSaveGalleryButton(false);

            const { ok, msg } = res.data;

            if (ok && msg === "Gallery updated succesfully.") {
              Swal.fire({
                title: "Process succesfully",
                text: msg,
                icon: "success",
                confirmButtonText: "Ok",
              });
              handleClose();
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
            setSaveGalleryButton(false);
            Swal.fire({
              title: "Error",
              text: "We are sorry, an error occurred.",
              icon: "error",
              confirmButtonText: "Try again",
            });
          });
      } else {
        let formData = new FormData();
        formData.append("galleryActive", true);
        for (var x = 0; x < gallery.length; x++) {
          formData.append("galleryImages", gallery[x]);
        }

        axios
          .post("/users/saveNewGallery", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setSaveGalleryButton(false);

            const { ok, msg } = res.data;

            if (ok && msg === "Gallery created succesfully.") {
              Swal.fire({
                title: "Process succesfully",
                text: msg,
                icon: "success",
                confirmButtonText: "Ok",
              });
              handleClose();
              setGalleryActive(true);
              setGalleryActiveContext(true);
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
            Swal.fire({
              title: "Error",
              text: "we are sorry, an error occurred.",
              icon: "error",
              confirmButtonText: "Try again",
            });
          });
      }
    }
  };

  return (
    <div className="mt-3">
      {loading ? <SpinnerLoading /> : null}
      <label className="font-weight-bold">Set up your gallery:</label>
      <InputGroup>
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
      </InputGroup>
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
          onSubmit={saveGallery}
          initialValues={{
            attachedDocument: "",
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
                  <Icon.Images className="mb-1" /> Set up your gallery
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 m-auto">
                      <Alert variant="info">
                        <Icon.InfoCircleFill className="mb-1" /> &nbsp; You need
                        to choose at once the pictures you might set into your
                        gallery.
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
                        {/* <Form.Label>Set up your gallery:</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => {
                            setGallery(e.target.files);
                          }}
                        /> */}

                        <Form.File custom>
                          <Form.File.Input
                            multiple
                            id="attachedDocument"
                            name="attachedDocument"
                            onChange={(e) => {
                              handleChange(e);
                              setFilesLength(e.target.files.length);
                              setGallery(e.target.files);
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
                  disabled={saveGalleryButton === true}
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
                          saveGalleryButton === true ? "inline-block" : "none",
                      }}
                      aria-hidden="true"
                    ></span>
                    {saveGalleryButton === true
                      ? " Loading, please wait..."
                      : "Save Gallery"}
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

export default GallerySetup;
