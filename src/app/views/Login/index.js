import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import history from "../../../components/History";
import LogoWhite from "../../../assets/images/logo-white.png";
import * as Icon from "react-bootstrap-icons";
import axios from 'axios';

const schema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Incorrect email format"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Password can't have spaces."),
});

export const Login = (sessionProps) => {
  const [disabledButton, setDisabledButton] = useState(false);

  const onSubmit = (event) => {

    const {email, password } = event;

    setDisabledButton(true);

    const payload = {
      email: email,
      password: password
    };

    axios.post(`http://localhost:4000/api/auth/login`, payload,{
      headers: {
        "Content-Type": "application/json",
      },
    },)
    .then(res => {

      const {ok, msg, token, userid} = res.data;

      /*Esto hay que revisarlo, para setear el token y el userid en con UseContext
      const {session, setSession} = sessionProps;

      setSession({target: {
        name: "token",
        value: token,
        }
      });

      setSession({target: {
        name: "userid",
        value: userid,
        }
      });*/

      /*Sí el login es ok, loguea*/
      if(ok && msg === "login"){
        setDisabledButton(false);
        history.push("/edit-profile");
      }
    })
    .catch((e) => {

      /*Sí los servicios están OFF, retornamos este swal*/
      if(e.response === undefined){
          Swal.fire({
            title: "Error",
            text: "Access is not possible at this time",
            icon: "error",
            confirmButtonText: "Try again",
          }); 
        setDisabledButton(false);
        return 1;
      }

      /*Si ocurre algo el request, retoramos esto*/
      const {msg, ok} = e.response.data;
      if(!ok){
        Swal.fire({
          title: "Error",
          text: msg,
          icon: "error",
          confirmButtonText: "Try again",
        });
      }

      setDisabledButton(false);
    });

  };

  return (
    <>
      <div className="container-login">
        <div className="d-flex justify-content-center">
          <div className="card-login">
            <div className="card-header">
              <h3>Sign in</h3>
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
                  email: "jlzd1994@gmail.com",
                  password: "123456789",
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
                            : "Login"}
                        </div>
                      </Button>
                    </InputGroup>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center text-white">
                Don't have an account? &nbsp;
                <a href="/create-profile"> Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="/forgot-password">Forgot your password?</a>
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
