import React from "react";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import history from "../../../components/History";

const schema = Yup.object({
  fullName: Yup.string().required("Full Name is required."),
  userName: Yup.string()
    .required("UserName is required.")
    .matches(
        /^\S*$/,
      "Username can't have spaces."
    ),
  email: Yup.string()
    .required("Email es requerido")
    .email("Formato de correo incorrecto"),
  serialNumber: Yup.string().required("Serial Number is required.")
  .matches(
    /^[1-9]+[0-9]*$/,
    "Only numbers."
  ),
  password: Yup.string().required("Password is required.")
  .matches(
    /^\S*$/,
  "Password can't have spaces."
),
});

export const CreateYourProfile = () => {
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
            <div className="justify-content-center">
              <div className="form-group row">
                <label style={{ color: "white" }}>Create your profile</label>
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
              </div>
              <div className="form-group row">
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
              </div>
              <div className="form-group row">
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
              </div>
              <div className="form-group row">
                <Form.Control
                  type="text"
                  placeholder="Type the serial number"
                  name="serialNumber"
                  value={values.serialNumber}
                  onChange={handleChange}
                  isValid={!!touched.serialNumber && !errors.serialNumber}
                  isInvalid={!!errors.serialNumber && !!touched.serialNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.serialNumber}
                </Form.Control.Feedback>
              </div>
              <div className="form-group row">
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
              </div>
              <div className="form-group row">
                <button type="submit" className="btn btn-light">
                  Create Account
                </button>
              </div>
              <div className="form-group row">
                <p className="text-white">
                  Already have an account?{" "}
                  <a href="/login" style={{ color: "#81BEF7" }}>
                    Click here
                  </a>{" "}
                  to login.
                </p>
              </div>
              <div className="form-group row">
                <p className="text-white">
                  By registering you agree to our{" "}
                  <a href="/" style={{ color: "#81BEF7" }}>
                    privacy policy
                  </a>{" "}
                  and{" "}
                  <a href="/" style={{ color: "#81BEF7" }}>
                    terms of service
                  </a>
                  .
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
