import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
// import { Formik } from "formik";
// import Swal from "sweetalert2";
// import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
//import { SpinnerLoading } from "../../../../components/SpinnerLoading";
import FormData from "form-data";

function GallerySetup() {
  const { objLogin, setGalleryActiveContext } = useContext(AppContext);
  const [gallery, setGallery] = useState([]);
  const [galleryActive, setGalleryActive] = useState(objLogin.galleryActive);

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const activateGallery = (e) => {;
    setGalleryActive(e.target.checked);
    setGalleryActiveContext(e.target.checked);
    // changeGPSNotificationsStatus(e.target.checked);
  };

  const saveGallery = () => {
    if(gallery !== null){
      alert("El usuario tiene galería");
    }else{
      alert("El usuario no tiene galería");
    }
    // let formData = new FormData();
    // formData.append("galleryActive", true);
    // for (var x = 0; x < gallery.length; x++) {
    //   formData.append("galleryImages", gallery[x]);
    // }

    // axios
    //   .post("/users/saveNewGallery", formData, {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };

  return (
    <div className="mt-3">
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
                  <Icon.InfoCircleFill className="mb-1" /> &nbsp; You need to
                  choose at once the pictures you might set into your gallery.
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
                  <Form.Label>Set up your gallery:</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => {
                      setGallery(e.target.files);
                    }}
                  />
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
            variant="primary"
            onClick={() => {
              handleClose();
              saveGallery();
            }}
          >
            Save Gallery
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GallerySetup;
