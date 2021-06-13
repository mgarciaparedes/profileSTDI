import React, { useState } from "react";
import { Form, InputGroup, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import history from "../../../components/History";
import LogoWhite from "../../../assets/images/logo-white.png";
import * as Icon from "react-bootstrap-icons";

const schema = Yup.object({
  fullName: Yup.string().required("Fullname is required."),
  userName: Yup.string()
    .required("Username is required.")
    .matches(/^\S*$/, "Username can't have spaces."),
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email format."),
  serialNumber: Yup.string()
    .required("Serial Number is required.")
    .matches(/^[1-9]+[0-9]*$/, "Only numbers."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/^\S*$/, "Password can't have spaces."),
});

export const CreateYourProfile = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = (event) => {
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
  };

  return (
    <>
      <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="card-sign-up">
            <div className="card-header">
              <h3>Create your profile</h3>
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
                  fullName: "",
                  userName: "",
                  email: "",
                  serialNumber: "",
                  password: "",
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
                          <Icon.BoxArrowUpRight />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Type here your username (www.profile.stdicompany.com/username)"
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
