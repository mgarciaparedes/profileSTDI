import React, { useState } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
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
  fullName: Yup.string().required("Fullname is required."),
  userName: Yup.string()
    .required("Username is required.")
    .min(8, "Username must have at least 8 digits.")
    .matches(/^\S*$/, "Username can't have spaces."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email format."),
  serialNumber: Yup.string()
    .required("Serial Number is required."),
    //.matches(/^[1-9]+[0-9]*$/, "Only numbers."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/^\S*$/, "Password can't have spaces."),
  passwordConfirm: Yup.string()
    .required("Confirm password is required.")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
});

export const CreateYourProfile = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = (event) => {
    setDisabledButton(true);

    const { userName, fullName, email, serialNumber, password } = event;

    const payload = {
      name: fullName,
      username: userName,
      email: email,
      serialNumber: serialNumber,
      password: password,
    };

    axios
      .post(`/users/saveNewUser`, payload)
      .then((res) => {
        setDisabledButton(false);
        const { ok, msg } = res.data;
        if (ok && msg === "User created succesfully.") {
          Swal.fire({
            title: "Success",
            text: "Your profile account have been created.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            } else {
              history.push("/login");
            }
          });
        }
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
          <div className="card-sign-up">
            <div className="card-header">
              <h3 className="text-center">Create your profile</h3>
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
                  fullName: "",
                  userName: "",
                  email: "",
                  serialNumber: "",
                  password: "",
                  passwordConfirm: "",
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
                          <Icon.PersonFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Type here your full name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        isValid={!!touched.fullName && !errors.fullName}
                        isInvalid={!!errors.fullName && !!touched.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullName}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          profile.stdicompany.com/
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="username"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        isValid={!!touched.userName && !errors.userName}
                        isInvalid={!!errors.userName && !!touched.userName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.userName}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.At />
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
                        className="lowercase"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.Upc />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Type the serial number"
                        name="serialNumber"
                        value={values.serialNumber}
                        onChange={handleChange}
                        isValid={!!touched.serialNumber && !errors.serialNumber}
                        isInvalid={
                          !!errors.serialNumber && !!touched.serialNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.serialNumber}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.KeyFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={!!touched.password && !errors.password}
                        isInvalid={!!errors.password && !!touched.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <Icon.KeyFill />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        isValid={
                          !!touched.passwordConfirm && !errors.passwordConfirm
                        }
                        isInvalid={
                          !!errors.passwordConfirm && !!touched.passwordConfirm
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirm}
                      </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className="mb-2">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={disabledButton === true}
                        block
                      >
                        <div className="d-flex d-inline-block justify-content-center">
                          <span
                            className="spinner-border spinner-border-sm mt-1 mr-2"
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
                            : "Create Account"}
                        </div>
                      </Button>
                    </InputGroup>

                    <Alert variant="info">
                      <Icon.ExclamationTriangleFill /> By registering you agree
                      to our <a href="/">privacy policy and terms of service</a>
                      .
                    </Alert>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Already have an account? &nbsp;
                <a href="/login">Click here</a>
                &nbsp; to login.
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
