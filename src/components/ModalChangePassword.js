import { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import * as Icon from "react-bootstrap-icons";
//import { AppContext } from "../../components/common/AppContext";

const schema = Yup.object({
  passwordOld: Yup.string()
    .required("Password is required")
    .min(8, "Password must have 8 digits"),
  passwordNew: Yup.string()
    .required("New Password is required")
    .min(8, "Confirm password must have 8 digits")
    .notOneOf(
      [Yup.ref("passwordOld"), null],
      "Password must be different than actual one"
    )
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Passwords must have uppercase letters, symbols and numbers"
    ),
  confirmPasswordNew: Yup.string()
    .oneOf([Yup.ref("passwordNew"), null], "Passwords must be the same")
    .required("Confirm password is required"),
});

function ModalChangePassword({ name, username, serialNumber, email }) {
  //const { objLogin } = useContext(AppContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = (event) => {
    setDisabledButton(true);

    const payload = {
      name: name,
      username: username,
      email: email,
      serialNumber: serialNumber,
      password: event.passwordOld,
      newPassword: event.passwordNew,
      confirmNewPassword: event.confirmPasswordNew,
    };

    axios
      .post("/auth/changePassword", payload)
      .then((res) => {
        if (res.data.ok === false) {
          Swal.fire({
            title: "There's something wrong",
            text: res.data.msg,
            icon: "info",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Changes saved succesfully",
            text: "",
            icon: "success",
            confirmButtonText: "Ok",
          });
          handleClose();
          setDisabledButton(false);
        }

        setDisabledButton(false);
      })
      .catch(function (error) {
        setDisabledButton(false);
        Swal.fire({
          icon: "error",
          title: "There's something wrong, please call the admin.",
        });
      });
  };
  return (
    <div>
      {/* <Button onClick={handleShow}>
        <Icon.PencilFill /> Change Password
      </Button> */}

      <a 
      onClick={handleShow}
      className="mb-3"
      href="javascript:void(0)"
        >
          <Icon.ShieldExclamation size={22} className="mb-1 mr-2" /> Change Password
        </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{
            passwordOld: "",
            passwordNew: "",
            confirmPasswordNew: "",
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
                      <div className="form-group row pt-2">
                        <div className="font-weight-bold form-label-container col-lg-3">
                          <label htmlFor="run">Password</label>
                        </div>
                        <div className="col-lg-9">
                          <Form.Control
                            type="password"
                            placeholder="Type here your actual password"
                            name="passwordOld"
                            value={values.passwordOld}
                            onChange={handleChange}
                            isValid={
                              !!touched.passwordOld && !errors.passwordOld
                            }
                            isInvalid={
                              !!errors.passwordOld && !!touched.passwordOld
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.passwordOld}
                          </Form.Control.Feedback>
                        </div>

                        <div className="font-weight-bold form-label-container col-lg-3 pt-2">
                          <label htmlFor="email">New Password</label>
                        </div>
                        <div className="col-lg-9 pt-2">
                          <Form.Control
                            type="password"
                            placeholder="Type here your new password"
                            name="passwordNew"
                            value={values.passwordNew}
                            onChange={handleChange}
                            isValid={
                              !!touched.passwordNew && !errors.passwordNew
                            }
                            isInvalid={
                              !!errors.passwordNew && !!touched.passwordNew
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.passwordNew}
                          </Form.Control.Feedback>
                        </div>

                        <div className="font-weight-bold form-label-container col-lg-3 pt-2">
                          <label htmlFor="email">Confirm New Password</label>
                        </div>
                        <div className="col-lg-9 pt-2">
                          <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            name="confirmPasswordNew"
                            value={values.confirmPasswordNew}
                            onChange={handleChange}
                            isValid={
                              !!touched.confirmPasswordNew &&
                              !errors.confirmPasswordNew
                            }
                            isInvalid={
                              !!errors.confirmPasswordNew &&
                              !!touched.confirmPasswordNew
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPasswordNew}
                          </Form.Control.Feedback>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="col-lg-12">
                <Button variant="light" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={disabledButton === true}
                >
                  <div className="d-flex d-inline-block justify-content-center">
                    <span
                      className="spinner-border spinner-border-sm mt-1 mr-2"
                      role="status"
                      style={{
                        display:
                          disabledButton === true ? "inline-block" : "none",
                      }}
                      aria-hidden="true"
                    ></span>
                    {disabledButton === true ? (
                      " Saving, please wait..."
                    ) : (
                      <>
                        <Icon.Check2Square className="mt-1" />
                        &nbsp;&nbsp;
                        <span>Change Password</span>
                      </>
                    )}
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

export default ModalChangePassword;
