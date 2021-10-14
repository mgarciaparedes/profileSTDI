import React, { useState, useEffect, useContext } from "react";
import { Modal, Form, InputGroup, Button, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";

const schema = Yup.object({
  usernameToBeLinked: Yup.string()
    .required("Username is required")
    .min(8, "Username must have 8 digits"),
});

function LinkToAnotherProfile() {
  const { objLogin, setLinkToExistentProfileContext } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isLinked, setIsLinked] = useState(objLogin.isLinked);
  const [disabledButton2, setDisabledButton2] = useState(false);

  //Variables para modal con info (primero)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Variables para modal con formulario (segundo)
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    if (isLinked === false) {
      setLoading(true);
      axios
        .post("/users/linkingProfile", {
          username: objLogin.username,
          isLinked: isLinked,
          usernameLinked: "",
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.ok) {
            setLoading(false);
            setLinkToExistentProfileContext(isLinked, "");
          } else {
            setLoading(false);
            Swal.fire({
              title: "Something's wrong :(",
              text: res.data.msg,
              icon: "info",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          Swal.fire({
            title: "Please try again",
            text: "",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
    }
  }, [isLinked]);

  const onSubmitLinkingProfile = (event) => {
    setDisabledButton2(true);

    setLinkToExistentProfileContext(isLinked, event.usernameToBeLinked);

    const payloadLinkingProfile = {
      username: objLogin.username,
      isLinked: isLinked,
      usernameLinked: event.usernameToBeLinked,
    };

    axios
      .post("/users/linkingProfile", payloadLinkingProfile)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          setDisabledButton2(false);
          handleClose2();
          Swal.fire({
            title: "Changes saved succesfully",
            text: res.data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          setDisabledButton2(false);
          Swal.fire({
            title: "Something's wrong :(",
            text: res.data.msg,
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        setDisabledButton2(false);
        Swal.fire({
          title: "Please try again",
          text: "",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <>
      {loading ? <SpinnerLoading /> : null}
      <Form.Label
        className="text-white form-label pb-0 mb-0"
        htmlFor="basic-url"
      >
        Connect an Existing Account:
      </Form.Label>
      <InputGroup>
        <Form.Check
          type="switch"
          name="linkToAnotherProfile"
          id="custom-switch-2"
          label={
            isLinked ? (
              <b className="text-success"> Enabled </b>
            ) : (
              <b className="text-warning"> Disabled </b>
            )
          }
          checked={isLinked === true ? true : false}
          onChange={(e) => {
            setIsLinked(!isLinked);
            if (!isLinked) {
              handleShow();
            } else {
            }
            //alert(e.target.checked);
          }}
        />
      </InputGroup>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            <Icon.Diagram2Fill className="mb-1" /> Connecting to existent profile
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 m-auto">
                <Alert variant="info">
                  <Icon.InfoCircleFill className="mb-1" size={20} /> &nbsp; Please read
                  the following info where we explain what does this mean.
                </Alert>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="col-lg-12">
          <Button
            variant="light"
            onClick={() => {
              handleClose();
              setIsLinked(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShow2();
            }}
          >
            Next step
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Link to an existing profile</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitLinkingProfile}
          initialValues={{
            usernameToBeLinked: objLogin.usernameLinked,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              name="login"
              autoComplete="off"
            >
              <Modal.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 m-auto">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            profile.stdicompany.com/
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          placeholder="username"
                          name="usernameToBeLinked"
                          value={values.usernameToBeLinked}
                          onChange={handleChange}
                          isValid={
                            !!touched.usernameToBeLinked &&
                            !errors.usernameToBeLinked
                          }
                          isInvalid={
                            !!errors.usernameToBeLinked &&
                            !!touched.usernameToBeLinked
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.usernameToBeLinked}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="col-lg-12">
                <Button
                  variant="light"
                  onClick={(e) => {
                    handleClose2();
                    setIsLinked(false);
                  }}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={disabledButton2 === true}
                >
                  <div className="d-flex d-inline-block justify-content-center">
                    <span
                      className="spinner-border spinner-border-sm mt-1 mr-2"
                      role="status"
                      style={{
                        display:
                          disabledButton2 === true ? "inline-block" : "none",
                      }}
                      aria-hidden="true"
                    ></span>
                    {disabledButton2 === true ? (
                      " Saving, please wait..."
                    ) : (
                      <>
                        <Icon.Check2Square className="mt-1" />
                        &nbsp;&nbsp;
                        <span>Save Changes</span>
                      </>
                    )}
                  </div>
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default LinkToAnotherProfile;
