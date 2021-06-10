import React, { useState } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

export const EditProfile = () => {
  console.log("Se ejecuta EditProfile");

  const onSubmit = () => {};

  const [formEditProfile, setFormEditProfile] = useForm({
    fullName: null,
    bio: null,
    socialMedia: null,
  });

  const handleSocialMedia = (e) => {
    setFormEditProfile(e);
    console.log(formEditProfile);
  };

  return (
    <>
      <Formik
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm({ values: null });
        }}
        initialValues={{ fullName: null, bio: null, socialMedia: null }}
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
            <div className="row">
              <div className="col-sm-12 col-md-12 text-right">
                <a style={{ color: "#81BEF7" }}>Sign Out</a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <div className="form-group row">
                  <label style={{ color: "white" }}>Full Name:</label>
                  <Form.Control
                    values={values.fullName}
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>Pofile Photo:</label>
                  <input type="file" />
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>Bio:</label>
                  <Form.Control
                    values={values.bio}
                    type="text"
                    placeholder="Write something about yourself..."
                  />
                </div>
                <div className="form-group row">
                  <label style={{ color: "white" }}>
                    Social Media Channels
                  </label>
                  <small style={{ color: "#E6E6E6" }}>
                    click from the drop down to add the social media link
                  </small>
                  <Form.Control
                    as="select"
                    name="socialMedia"
                    values={values.socialMedia}
                    onChange={(e) => {
                      handleSocialMedia(e);
                    }}
                    className="form-control"
                  >
                    <option value={null}>Social Media Sites</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Soundcloud">Soundcloud</option>
                    <option value="Linkedin">Linkedin</option>
                  </Form.Control>
                </div>
                <div className="form-group row">
                  <button className="btn btn-primary">Update changes</button>
                </div>
              </div>

              {/*Parte en donde se van mostrando los cambios*/}
              <div className="col-sm-6">
                <div className="form-group row">
                  <label style={{ color: "white" }}>Antonio</label>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
