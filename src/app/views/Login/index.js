import React from "react";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import history from '../../../components/History';

const schema = Yup.object({
    email: Yup.string()
    .required("Email es requerido")
    .email("Formato de correo incorrecto"),
    password: Yup.string().required("Contraseña es requerido"),
  });

export const Login = () => {

const onSubmit = (event) => {

    if(event.email==="johndoe@example.com" && event.password==="1234"){
        history.push("/edit-profile");
    }else{
        Swal.fire({
            title: 'Error',
            text: 'Invalid login or password',
            icon: 'error',
            confirmButtonText: 'Try again'
          })
    }
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
          email: "johndoe@example.com",
          password: "1234",
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
                <label style={{ color: "white" }}>
                    Sign in
                </label>
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
                <button type="submit" className="btn btn-light">Sign in</button>
              </div>
              <div className="form-group row">
                <a style={{ color: "#81BEF7" }}>Forgot password?</a>
              </div>
              <div className="form-group row">
                <a style={{ color: "#81BEF7" }}>
                  privacy policy terms of service
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
