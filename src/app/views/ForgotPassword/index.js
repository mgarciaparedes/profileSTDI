import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import history from "../../../components/History";
import LogoWhite from "../../../assets/images/logo-white.png";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import helpers from "../../../components/Helpers";

const { swalOffBackend } = helpers;


const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Incorrect email format"),
});

export const ForgotPassword = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = (event) => {
    setDisabledButton(true);

    const { email } = event;
    const payload = {
      email: email,
    };

    axios
      .post(`auth/forgotPassword`, payload)
      .then((res) => {
        const { ok, msg } = res.data;

        if (ok && msg === "Password was sent to your email, please follow the steps to login again.") {
          setDisabledButton(false);

          Swal.fire({
            title: "Verification code was sent!",
            text: msg,
            icon: "info",
            confirmButtonText: "OK",
          }).then((result) => {
            
            if (result.isConfirmed) {
              history.push("/login");
            } else {
              history.push("/login");
            }

          });

        } else {

            setDisabledButton(false);

            Swal.fire({
              title: "Error",
              text: "An error occurred while trying to change the password",
              icon: "error",
              confirmButtonText: "Try again",
            });
        }

        setDisabledButton(false);
      })
      .catch((e) => {
        /*Sí los servicios están OFF, retornamos este swal*/
        if (e.response === undefined) {
          swalOffBackend();
          setDisabledButton(false);
          return 1;
        }

        /*Si ocurre algo en el request, retoramos esto*/
        const { msg, ok } = e.response.data;
        if (!ok) {
          Swal.fire({
            title: "Error",
            text: msg,
            icon: "error",
            confirmButtonText: "Try again",
          });
          setDisabledButton(false);
        }
    });
    
  };

  return (
    <>
      <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="card-login">
            <div className="card-header">
              <h3>Forgot Password?</h3>
              <div className="d-flex justify-content-end social_icon">
                <img className="logo-login" src={LogoWhite} alt="Logo" />
              </div>
            </div>
            <div className="card-body">
              <Formik
                validationSchema={schema}
                // onSubmit={(values, { resetForm }) => {
                //   onSubmit(values);
                //   resetForm({ values: null });
                // }}
                onSubmit={onSubmit}
                initialValues={{
                  email: "johndoe@example.com",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
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
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.PersonBoundingBox />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Example: johndoe@example.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={!!touched.email && !errors.email}
                        isInvalid={!!errors.email && !!touched.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={disabledButton === true}
                        block
                      >
                        <div className="d-flex d-inline-block justify-content-center">
                          <span
                            className="spinner-grow spinner-grow-sm mt-1 mr-2"
                            role="status"
                            style={{
                              display:
                                disabledButton === true
                                  ? "inline-block"
                                  : "none",
                            }}
                            aria-hidden="true"
                          ></span>
                          {disabledButton === true
                            ? " Loading, please wait..."
                            : "Send verification code"}
                        </div>
                      </Button>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Back to Login? &nbsp;
                <a href="/login"> Click Here</a>
              </div>
              <div className="d-flex justify-content-center text-white">
                Don't have an account? &nbsp;
                <a href="/create-profile"> Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/">Privacy Policy and Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
