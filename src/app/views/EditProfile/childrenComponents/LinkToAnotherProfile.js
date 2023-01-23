import React, { useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Formik } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";

const schema = Yup.object({
  usernameToBeLinked: Yup.string()
    .required("Username is required")
    .min(8, "Username must have 8 digits"),
});

function LinkToAnotherProfile({
  isLinked,
  setIsLinked,
  username,
  //usernameLinked,
}) {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [disabledButton2, setDisabledButton2] = useState(false);

  const onSubmitLinkingProfile = (event) => {
    setDisabledButton2(true);

    const payloadLinkingProfile = {
      username: username,
      isLinked: isLinked,
      usernameLinked: event.usernameToBeLinked,
    };
    console.log(payloadLinkingProfile);
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
              handleShow2();
            }
          }}
        />
      </InputGroup>

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
            usernameToBeLinked: "",
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
                            qtap.me/
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
