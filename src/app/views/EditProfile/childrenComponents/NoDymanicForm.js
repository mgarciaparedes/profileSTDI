import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Icon from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { Form, InputGroup, Alert, Button } from "react-bootstrap";

//Componente Hijo
import SendNotifications from "./SendNotifications";

function NoDymanicForm({
  nameState,
  bioState,
  sendNotifications,
  setSendNotifications,
  disabledButton,
  reader,
  reader2,
  handleNameChange,
  handleBioChange,
  handleOnAdd,
  onSubmit,
  clearData,
  setBase64ImgBanner,
}) {
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm({ values: null });
      }}
      initialValues={{
        fullName: nameState,
        bio: bioState,
        socialMedia: null,
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
          name="addProfileData"
          id="addProfileeData"
        >
          <div className="row">
            <div className="col-12 col-sm-12">
              {/*Inicio Campo Profile Fullname*/}
              <Form.Label className="text-white form-label" htmlFor="basic-url">
                Profile Full Name:
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  name="fullName"
                  //values={values.fullName}
                  defaultValue={nameState}
                  type="text"
                  placeholder="Type your profile name"
                  onChange={handleNameChange}
                />
              </InputGroup>
              {/*Fin Campo Profile Fullname*/}
              {/*Inicio Campo Profile Photo*/}
              <InputGroup className="mb-2">
                <Form.Group controlId="formFile" className="mb-2">
                  <Form.Label className="text-white form-label">
                    Profile Photo:
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        if (
                          e.target.files[0].type === "image/jpeg" ||
                          e.target.files[0].type === "image/jpg" ||
                          e.target.files[0].type === "image/png" ||
                          e.target.files[0].type === "image/gif"
                        ) {
                          reader.readAsDataURL(e.target.files[0]);
                        } else {
                          Swal.fire({
                            title: "Unsupported format",
                            text: "Format supported: JPG, JPEG, PNG and GIF.",
                            icon: "info",
                            confirmButtonText: "OK",
                          });
                        }
                      } else {
                        setBase64ImgBanner("");
                      }
                    }}
                  />
                </Form.Group>
              </InputGroup>
              {/*Fin Campo Profile Photo*/}
              {/*Inicio Campo Banner Photo*/}
              <InputGroup className="mb-2">
                <Form.Group controlId="formFile2" className="mb-2">
                  <Form.Label className="text-white form-label">
                    Banner Photo:
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        if (
                          e.target.files[0].type === "image/jpeg" ||
                          e.target.files[0].type === "image/jpg" ||
                          e.target.files[0].type === "image/png" ||
                          e.target.files[0].type === "image/gif"
                        ) {
                          reader2.readAsDataURL(e.target.files[0]);
                        } else {
                          Swal.fire({
                            title: "Unsupported format",
                            text: "Format supported: JPG, JPEG, PNG and GIF.",
                            icon: "info",
                            confirmButtonText: "OK",
                          });
                        }
                      } else {
                        setBase64ImgBanner("");
                      }
                    }}
                  />
                </Form.Group>
              </InputGroup>
              {/*Fin Campo Banner Photo*/}
              {/*Inicio Campo Profile Bio*/}
              <SendNotifications
                setSendNotifications={setSendNotifications}
                sendNotifications={sendNotifications}
              />
              {/*Fin Campo Banner Photo*/}
              {/*Inicio Campo Profile Bio*/}
              <Form.Label
                className="text-white form-label mt-2"
                htmlFor="basic-url"
              >
                Profile Bio:
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  name="bio"
                  //values={values.bio}
                  defaultValue={bioState}
                  as="textarea"
                  placeholder="Type your profile name"
                  onChange={handleBioChange}
                  style={{ height: "100px" }}
                />
              </InputGroup>
              {/*Fin Campo Profile Bio*/}
              {/*Inicio Select Social Media Channels*/}

              <Form.Label className="text-white form-label" htmlFor="basic-url">
                Social Media Channels:
              </Form.Label>
              <Alert variant="info">
                <Icon.ListCheck size={25} />
                &nbsp; Click from the drop down to add the social media link.
              </Alert>
                  <InputGroup>
                    <Form.Control
                      as="select"
                      name="socialMedia"
                      values={values.socialMedia}
                      onChange={(e) => {
                        //if ((e.target.value = "CustomURL")) {
                        //}
                        handleOnAdd(e);
                        //handleSocialMedia(e);
                      }}
                      className="mb-4"
                    >
                      <option value="">Choose your media...</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Whatsapp">Whatsapp</option>
                      <option value="Snapchat">Snapchat</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Soundcloud">Soundcloud</option>
                      <option value="Linkedin">Linkedin</option>
                      <option value="Telegram">Telegram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Twitter">Twitter</option>
                      <option value="Spotify">Spotify</option>
                      <option value="Apple Music">Apple Music</option>
                      <option value="Venmo">Venmo</option>
                      <option value="CashApp">CashApp</option>
                      <option value="Phone Number">Phone Number</option>
                      <option value="Paypal">Paypal</option>
                      <option value="GoFundMe">GoFundMe</option>
                      <option value="Twitch">Twitch</option>
                      <option value="Discord">Discord</option>
                      <option value="HouseParty">HouseParty</option>
                      <option value="OnlyFans">OnlyFans</option>
                      <option value="Address">Address</option>
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Website">Website</option>
                      <option value="CustomURL">CustomURL</option>
                      <option value="Embed Youtube Video">
                        Embed Youtube Video
                      </option>
                    </Form.Control>
                  </InputGroup>
            </div>

            <div className="col-12 col-sm-12 col-md-6">
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
                          disabledButton === true ? "inline-block" : "none",
                      }}
                      aria-hidden="true"
                    ></span>
                    {disabledButton === true ? (
                      " Loading, please wait..."
                    ) : (
                      <>
                        <Icon.PersonLinesFill className="mt-1" />
                        &nbsp;&nbsp;
                        <span>Save Changes</span>
                      </>
                    )}
                  </div>
                </Button>
              </InputGroup>
            </div>

            <div className="col-12 col-sm-12 col-md-6">
              <InputGroup className="mb-2">
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => clearData()}
                  block
                >
                  <div className="d-flex d-inline-block justify-content-center">
                    <Icon.BackspaceFill className="mt-1" />
                    &nbsp;&nbsp;
                    <span>Clear Data</span>
                  </div>
                </Button>
              </InputGroup>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NoDymanicForm;
