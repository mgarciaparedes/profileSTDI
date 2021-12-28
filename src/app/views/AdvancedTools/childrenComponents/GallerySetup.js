import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Form,
  InputGroup,
  Button,
  Alert,
  Carousel,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";
import FormData from "form-data";

function GallerySetup() {
  const { objLogin, setGalleryActiveContext, setGalleryImageContext } =
    useContext(AppContext);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState(objLogin.galleryImages);
  const [saveGalleryButton, setSaveGalleryButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [galleryActive, setGalleryActive] = useState(objLogin.galleryActive);
  const [showModalAmountInputs, setShowModalAmountInputs] = useState(false);
  const [showModalGallery, setShowModalGallery] = useState(false);
  const [amountInputsGallery, setAmountInputsGallery] = useState(0);
  const [arrayToMapInputs, setArrayToMapInputs] = useState([]);
  const [arrayInputsValues, setArrayInputsValues] = useState([]);
  const [arrayURLValues, setArrayURLValues] = useState([]);
  const [galleryToRenderInModal, setGalleryToRenderInModal] = useState([]);

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModalAmountInputs = () => setShowModalAmountInputs(false);
  const showModalInputs = () => setShowModalAmountInputs(true);

  //Variables para el uso del carousel
  const [index2, setIndex2] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex2(selectedIndex);
  };

  const schemaModalAmount = Yup.object({
    imagesNumber: Yup.number().required("Number of images are required"),
  });

  // const schema = Yup.object().shape({
  //   attachedDocument: Yup.mixed().required("At least one file is required"),
  // });

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
        setLoading(false);
        const { ok, msg } = res.data;
        if (!ok && msg === "Gallery not found.") {
          Swal.fire({
            title: "Something happened!",
            text: "User without gallery registered.",
            icon: "info",
            confirmButtonText: "Ok",
          });
          setGalleryActive(false);
          setGalleryActiveContext(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "An error occurred!",
          text: "Please try again",
          icon: "info",
          confirmButtonText: "Ok",
        });
      });
  };

  const checkFilesFormat = (arrayInputsValues) => {
    //Esta función recorre el arreglo de imágenes buscando
    //archivos adjuntados que tengan formato de imágenes
    //así validamos que los archivos subidos sean solo imágenes
    for (var i = 0; i < arrayInputsValues.length; i++) {
      if (
        arrayInputsValues[i].type === "image/jpeg" ||
        arrayInputsValues[i].type === "image/jpg" ||
        arrayInputsValues[i].type === "image/png"
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  const saveGallery = () => {
    setSaveGalleryButton(true);

    //Primero voy a validar si los formatos de los archivos están correctos
    //enviándole el arreglo de Files seleecionados a esta función
    const checkAttachedFiles = checkFilesFormat(arrayInputsValues);

    //Aquí valido que hayan sido seleccionado todos los archivos
   if (
      arrayInputsValues.some(
        (elem) => elem.length === 0 || elem.name === "filename"
      )
    ) {
      setSaveGalleryButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Some files to upload are missing, please tap in every button to upload all the files.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      //Aquí valido que el tamaño de las imágenes a subir no sobrepasen los 5MB.
    } else if (arrayInputsValues.some((elem) => elem.size >= 5000000)) {
      setSaveGalleryButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Images should not exceed 5MB.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      //Aquí valido que la funciión que revisa los formatos de los files hayan sido todos formato imagen
    } else if (!checkAttachedFiles) {
      setSaveGalleryButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Files format must be .jpg, .jpeg y .png",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      setGalleryActive(true);
      setGalleryActiveContext(true);
      //aquí comparo si el usuario ya tiene una galería previamente registrada
      //si gallery viene como null, quiere decir que no hay registros y se porcerá a usar el servicio saveNewGallery
      //por el contrario, si tiene ya registros, solo se deberá modificar el registro que ya tiene guardado.
      if (galleryImages !== null) {
        console.log(arrayURLValues);
        let formData2 = new FormData();
        formData2.append("galleryActive", true);
        for (var x = 0; x < arrayInputsValues.length; x++) {
          formData2.append("galleryImages", arrayInputsValues[x]);
          formData2.append("galleryURL", arrayURLValues[x].url);
        }

        axios
          .post("/users/updateGallery", formData2, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setSaveGalleryButton(false);

            const { ok, msg, newData } = res.data;

            if (ok && msg === "Gallery updated succesfully.") {
              Swal.fire({
                title: "Process succesfully",
                text: msg,
                icon: "success",
                confirmButtonText: "Ok",
              });

              setGalleryImages(newData.galleryImages);
              setGalleryImageContext(newData.galleryImages);
              handleClose();
              // document.getElementById("attachedDocument").value = "";
              // setFilesLength(0);
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
        console.log(arrayURLValues);
        let formData = new FormData();
        formData.append("galleryActive", true);
        for (var x = 0; x < arrayInputsValues.length; x++) {
          formData.append("galleryImages", arrayInputsValues[x]);
          formData.append("galleryURL", arrayURLValues[x].url);
        }

        axios
          .post("/users/saveNewGallery", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            setSaveGalleryButton(false);

            const { ok, msg, event } = res.data;

            if (ok && msg === "Gallery created succesfully.") {
              const { galleryImages } = event;

              handleClose();
              setGalleryImages(galleryImages);
              setGalleryImageContext(galleryImages);

              Swal.fire({
                title: "Process succesfully",
                text: msg,
                icon: "success",
                confirmButtonText: "Ok",
              });

              // document.getElementById("attachedDocument").value = "";
              // setFilesLength(0);
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

  const RenderInputsGallery = (event) => {
    //Primero, cerramos el modal que está a la vista
    handleCloseModalAmountInputs();

    //Segundo, calculamos el valor del arreglo según el primer select
    const amount = event.imagesNumber;

    if (amount > 0) {
      setAmountInputsGallery(amount);

      let inputs = [];
      let inputsValues = [];
      let urlValues = [];
      for (let i = 0; i < amount; i++) {
        inputs.push(1);
        inputsValues.push(new File([""], "filename"));
        urlValues.push({ url: "" });
      }
      setArrayToMapInputs(inputs);
      setArrayInputsValues(inputsValues);
      setArrayURLValues(urlValues);
      setGallery(inputsValues);
    }

    //Luego mostramos el segundo modal con la cantidad de inputs
    handleShow();
  };

  return (
    <div className="mt-3">
      {loading ? <SpinnerLoading /> : null}
      <label className="font-weight-bold">
        Set up your gallery:{" "}
        {galleryImages === null ? (
          <Icon.EyeSlashFill size={25} />
        ) : (
          <Icon.EyeFill
            size={25}
            onClick={() => {
              setGalleryToRenderInModal(objLogin.galleryImages);
              setShowModalGallery(true);
            }}
          />
        )}
      </label>
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
      {/* <Button
        onClick={() => setShowModalGallery(true)}
        disabled={galleryImages === null}
      >
        Show saved gallery
      </Button>
      <br /> */}
      <Button variant="light" className="mt-1" onClick={showModalInputs}>
        Click here to begin the steps
      </Button>

      {/* Modal que muestra la cantidad de input files a subir */}
      <Modal
        show={showModalAmountInputs}
        onHide={handleCloseModalAmountInputs}
        backdrop="static"
        keyboard={false}
      >
        <Formik
          validationSchema={schemaModalAmount}
          onSubmit={RenderInputsGallery}
          initialValues={{
            imagesNumber: "",
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
              name="ModalAmount"
              id="ModalAmount"
            >
              <Modal.Header>
                <Modal.Title>
                  <Icon.Images className="mb-1" />
                  &nbsp; Set up your gallery
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Alert variant="info">
                  <Icon.InfoCircleFill className="mb-1" /> &nbsp; Please enter
                  the number of images in your gallery
                </Alert>
                <Form.Control
                  as="select"
                  name="imagesNumber"
                  value={values.imagesNumber}
                  onChange={handleChange}
                  isValid={!!touched.imagesNumber && !errors.imagesNumber}
                  isInvalid={!!errors.imagesNumber && !!touched.imagesNumber}
                >
                  <option value="">Choose the number of images...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.imagesNumber}
                </Form.Control.Feedback>
              </Modal.Body>
              <Modal.Footer className="col-lg-12">
                <Button
                  variant="light"
                  onClick={() => {
                    handleCloseModalAmountInputs();
                  }}
                >
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Next step
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Modal que muestra los input a subir con su respectiva url */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <Icon.Images className="mb-1" /> Set up your gallery
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={amountInputsGallery ? "" : "d-none"}>
          <Alert variant="info">
            <Icon.InfoCircleFill className="mb-1" /> &nbsp; Select the file in
            the order especified before every button.
          </Alert>
          {arrayToMapInputs.map((elemento, index) => (
            <div key={index}>
              <label>Position {index + 1}</label>
              <InputGroup className="mb-1">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <Icon.BoxArrowUpRight />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Url to open in another tab"
                  name={"url" + index}
                  onChange={(e) => {
                    arrayURLValues[index].url = e.target.value;
                    console.log(arrayURLValues);
                  }}
                />
              </InputGroup>
              <input
                type="file"
                onChange={(e) => {
                  //console.log(e.target.files);
                  //arrayInputsValues[index] = e.target.files[0];
                  if (e.target.files.length > 0) {
                    arrayInputsValues[index] = e.target.files[0];
                  } else {
                    arrayInputsValues[index] = new File([""], "filename");
                  }
                }}
                name={"attachedDocument" + index}
                className="mb-2"
              />
            </div>
          ))}
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
            type="button"
            variant="primary"
            disabled={saveGalleryButton === true}
            onClick={() => {
              saveGallery();
            }}
          >
            <div className="d-flex d-inline-block justify-content-center">
              <span
                className="spinner-border spinner-border-sm mt-1 mr-2"
                role="status"
                style={{
                  display: saveGalleryButton === true ? "inline-block" : "none",
                }}
                aria-hidden="true"
              ></span>
              {saveGalleryButton === true
                ? " Loading, please wait..."
                : "Save Gallery"}
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Modal que muestra la galería que tiene actualmente el cliente*/}
      <Modal
        show={showModalGallery}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Showing last saved gallery</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Carousel activeIndex={index2} onSelect={handleSelect}>
            {galleryToRenderInModal !== null &&
            galleryToRenderInModal.length > 0
              ? galleryToRenderInModal.map((elemento, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`${process.env.REACT_APP_API_URL}/render/image/${elemento.image}`}
                      alt="First slide"
                    />
                  </Carousel.Item>
                ))
              : null}
          </Carousel>
        </Modal.Body>
        <Modal.Footer className="col-lg-12">
          <Button
            variant="light"
            onClick={() => {
              setShowModalGallery(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GallerySetup;
