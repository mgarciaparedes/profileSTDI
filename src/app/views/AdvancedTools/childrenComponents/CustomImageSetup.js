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
  const [loading, setLoading] = useState(false);
  const [isValidFile, setIsValidFile] = useState(false);
  const [showModalAmountInputs, setShowModalAmountInputs] = useState(false);
  const [amountInputsGallery, setAmountInputsGallery] = useState(0);
  const [arrayToMapInputs, setArrayToMapInputs] = useState([]);
  const [arrayInputsValues, setArrayInputsValues] = useState([]);
  const [customImageButtonName, setCustomImageButtonName] = useState("");

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseModalAmountInputs = () => setShowModalAmountInputs(false);
  const showModalInputs = () => setShowModalAmountInputs(true);

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

  const schemaModalAmount = Yup.object({
    imagesNumber: Yup.string().required("Number of images are required"),
  });

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


  const saveCustomImage = () => {
    //console.log(arrayURLValues);
    setSaveCustomImageButton(true);

    //Primero voy a validar si los formatos de los archivos están correctos
    //enviándole el arreglo de Files seleecionados a esta función
    const checkAttachedFiles = checkFilesFormat(arrayInputsValues);

    //Aquí valido que hayan sido seleccionado todos los archivos
    if (
      arrayInputsValues.some(
        (elem) => elem.length === 0 || elem.name === "filename"
      )
    ) {
      setSaveCustomImageButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Some files to upload are missing, please tap in every button to upload all the files.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      //Aquí valido que la funciión que revisa los formatos de los files hayan sido todos formato imagen
    } else if (!checkAttachedFiles) {
      setSaveCustomImageButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Files format must be .jpg, .jpeg y .png",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else if (customImageButtonName === "") {
      setSaveCustomImageButton(false);
      Swal.fire({
        title: "An error occurred!",
        text: "Custom Image Button must have a name",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      let formData = new FormData();
      formData.append("customImageActive", true);
      formData.append("customImageButtonName", customImageButtonName);
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
          setSaveCustomImageButton(false);
          Swal.fire({
            title: "Error",
            text: "we are sorry, an error occurred.",
            icon: "error",
            confirmButtonText: "Try again",
          });
        });
    }
  };

  const RenderInputsCustomImage = (event) => {
    //Primero, cerramos el modal que está a la vista
    handleCloseModalAmountInputs();

    //Segundo, calculamos el valor del arreglo según el primer select
    const amount = event.imagesNumber;

    if (amount > 0) {
      setAmountInputsGallery(amount);

      let inputs = [];
      let inputsValues = [];
      for (let i = 0; i < amount; i++) {
        inputs.push(1);
        inputsValues.push(new File([""], "filename"));
      }
      setArrayToMapInputs(inputs);
      setArrayInputsValues(inputsValues);
      setCustomImage(inputsValues);
    }

    //Luego mostramos el segundo modal con la cantidad de inputs
    handleShow();
  };

  return (
    <div className="mt-3">
      {loading ? <SpinnerLoading /> : null}
      <label className="font-weight-bold">Set up Custom Images:</label>

      <Button variant="light" className="mt-1" onClick={showModalInputs}>
        Click here to begin the steps
      </Button>

      {/*Modal que muestra la cantidad de imágenes a elegir*/}
      <Modal
        show={showModalAmountInputs}
        onHide={handleCloseModalAmountInputs}
        backdrop="static"
        keyboard={false}
      >
        <Formik
          validationSchema={schemaModalAmount}
          onSubmit={RenderInputsCustomImage}
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
                  <Icon.Images className="mb-1" /> &nbsp;
                  Set up a custom image
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Alert variant="info">
                  <Icon.InfoCircleFill className="mb-1" /> &nbsp; Please enter
                  the number of images in your custom image button
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

      {/*Modal que muestra los input file y el input text para el nombre del botón*/}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <Icon.Images className="mb-1" /> &nbsp; Set up a custom image
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={amountInputsGallery ? "" : "d-none"}>
          <Alert variant="info">
            <Icon.InfoCircleFill className="mb-1" /> &nbsp; Select the file in
            the order especified before every button.
          </Alert>

          <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Icon.Spellcheck />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Custom Button Name"
              name="customImageButtonName"
              onChange={(e) => {
                setCustomImageButtonName(e.target.value);
              }}
            />
          </InputGroup>

          {arrayToMapInputs.map((elemento, index) => (
            <div key={index}>
              <label>Position {index + 1}</label>

              <input
                type="file"
                onChange={(e) => {
                  //console.log(e.target.files);
                  arrayInputsValues[index] = e.target.files[0];
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
            variant="primary"
            disabled={saveCustomImageButton === true}
            onClick={() => {
              saveCustomImage();
            }}
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
      </Modal>
    </div>
  );
}

export default CustomImageSetup;
