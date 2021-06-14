import React, { useState, useEffect /*useCallback*/ } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import { Form, InputGroup, Alert, Button } from "react-bootstrap";
import Swal from "sweetalert2";
//import { SetChanges } from "./childComponent/SetChanges";
import * as Icon from "react-bootstrap-icons";
import userImage from "../../../assets/images/default-user-image.png";
import IconX from "../../../assets/images/icon-eliminate.png";
import BackgroundImage from "../../../assets/images/background.svg";

//Está función está fuera del render porque si la dejo dentro de la func principal
//se vuelve a renderizar y no funciona.
//Es la función que me devuelve el html de las redes sociales => RRSS
//seleccionadas. Si te fijas yo decido como se está viendo con el valor de view,
//si view===1 me devuelve la vista de los campos que puedo editar
//si view===2 me devuelve la vista de las redes sociales en columna derecha
function Row({
  onChange,
  onRemove,
  view,
  profile,
  socialNetwork,
  socialNetworkIcon,
  socialNetworkURL,
}) {
  return (
    <>
      {view === 1 ? (
        <div className="row">
          <div className="col-8 col-sm-10">
            <label className="text-white">{socialNetwork}</label>
            <Form.Control
              name="profile"
              value={profile}
              onChange={(e) => onChange("profile", e.target.value)}
              //onClick={e => onChange("touchedField1", true)}
              placeholder="Type your profile name in this social network"
              className="mb-2"
            />
          </div>

          <div className="col-4 col-sm-2">
            <label className="text-white">&nbsp;</label>
            <br />
            <button className="button-transparent" onClick={onRemove}>
              <img src={IconX} className="icon-eliminate" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="border m-1 col-sm-5">
            <a className="btn-no-style" target="_blank" href={socialNetworkURL+profile}>
            <div className="p-3">
              <div className="d-flex justify-content-center">
                {socialNetworkIcon}
              </div>
              <div className="d-flex justify-content-center">
                <h6>{socialNetwork}</h6>
              </div>
              <div className="d-flex justify-content-center">
                <h5>{profile}</h5>
                
              </div>
            </div>
            </a>
          </div>
        </>
      )}
    </>
  );
}

export const EditProfile = () => {
  const [nameState, setNameState] = useState("");
  const [bioState, setBioState] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  //Esto no le pares, es la prueba del useCallback del Curso
  //const [counter,setCounter] = useState(10);

  // const increment = useCallback( () => {
  //   setCounter(c => c + 1);
  // }, [setCounter]);

  //Esta función va a guardar cada vez que se cambie algo en los campos de RRSS
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  //Declaro el estado del arreglo inicial que va a guardar las RRSS seleccionadas
  const [rows, setRows] = useState([]);

  //Función que guarda una fila nueva cada vez que se seleccione una opción nueva de RRSS
  //OJO: FALTA VALIDAR QUE UNA VEZ UNA OPCIÓN SEA SELECCIONADA NO PUEDA SELECCIONARSE NUEVAMENTE
  const handleOnAdd = (e) => {
    setRows(
      rows.concat({
        socialNetwork: e.target.value,
        profile: "",
        //socialNetworkIcon: e.target.value === "Instagram" ? <Icon.Instagram /> : null,
        socialNetworkIcon: findIcon(e.target.value),
        socialNetworkURL: findURL(e.target.value)
      })
    );
  };

  //Función que devuelve el ícono elegido al seleccionar la Red Social
  const findIcon = (iconName) => {
    switch (iconName) {
      case "Instagram":
        return (
          <Icon.Instagram
            style={{ color: "#C13584" }}
            size={40}
          />
        );
      case "Youtube":
        return <Icon.Youtube style={{ color: "red" }} size={40} />;
    }
  };

  //Función que devuelve la url de la red social seleccionada
  const findURL = (iconName) => {
    switch (iconName) {
      case "Instagram":
        return "http://www.instagram.com/";
      case "Youtube":
        return "http://www.youtube.com/";
    }
  };

  //Función que elimina una fila determinada.
  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  useEffect(() => {
    console.log("Se ejecuta EditProfile");
  }, []);

  const handleNameChange = (e) => {
    setNameState(e.target.value);
  };

  const handleBioChange = (e) => {
    setBioState(e.target.value);
  };

  const [formEditProfile, setFormEditProfile] = useForm({
    button: null,
    bio: null,
    socialMedia: null,
  });

  const handleSocialMedia = (e) => {
    setFormEditProfile(e);
    console.log(formEditProfile);
  };

  const onSubmit = () => {
    setDisabledButton(true);
    console.log(rows);

    setTimeout(() => {
      setDisabledButton(false);
      Swal.fire({
        title: "Changes have been updated",
        text: "Check your profile ;)",
        icon: "success",
        confirmButtonText: "OK",
      });
    }, 2000);
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-12 text-right">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Sign Out"
            className="text-white"
          />
        </div>
      </div>

      <div className="mt-5 row">
        <div
          className="p-5 
              col-sm-6 col-md-6"
        >
          <Formik
            onSubmit={(values, { resetForm }) => {
              onSubmit(values);
              resetForm({ values: null });
            }}
            initialValues={{
              fullName: null,
              bio: null,
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
                name="addServiceData"
                id="addServiceData"
              >
                {/*Inicio Campo Profile Fullname*/}
                <Form.Label
                  className="text-white form-label"
                  htmlFor="basic-url"
                >
                  Profile Full Name:
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    name="fullName"
                    values={values.fullName}
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
                    <Form.Control type="file" />
                  </Form.Group>
                </InputGroup>
                {/*Fin Campo Profile Photo*/}
                {/*Inicio Campo Profile Bio*/}
                <Form.Label
                  className="text-white form-label"
                  htmlFor="basic-url"
                >
                  Profile Bio:
                </Form.Label>
                <InputGroup className="mb-2">
                  <Form.Control
                    name="bio"
                    values={values.bio}
                    as="textarea"
                    placeholder="Type your profile name"
                    onChange={handleBioChange}
                    style={{ height: "100px" }}
                  />
                </InputGroup>
                {/*Fin Campo Profile Bio*/}
                {/*Inicio Select Social Media Channels*/}
                <Form.Label
                  className="text-white form-label"
                  htmlFor="basic-url"
                >
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
                      handleOnAdd(e);
                      handleSocialMedia(e);
                    }}
                    className="mb-4"
                  >
                    <option value="Social Media Sites">
                      Social Media Sites
                    </option>
                    <option value="Instagram">Instagram</option>
                    <option value="Snapchat">Snapchat</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Soundcloud">Soundcloud</option>
                    <option value="Linkedin">Linkedin</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Spotify">Spotify</option>
                    <option value="Apple Music">Apple Music</option>
                    <option value="Venmo">Venmo</option>
                    <option value="CashApp">CashApp</option>
                    <option value="Phone Number">Phone Number</option>
                    <option value="Email">Email</option>
                    <option value="Website">Website</option>
                    <option value="CustomURL">CustomURL</option>
                  </Form.Control>
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
                            disabledButton === true ? "inline-block" : "none",
                        }}
                        aria-hidden="true"
                      ></span>
                      {disabledButton === true
                        ? " Loading, please wait..."
                        : "Update Changes"}
                    </div>
                  </Button>
                </InputGroup>

                {
                  //Aquí se muestran las RRSS seleccionadas
                  //Si te fijas estoy dentro de la columna de Edición
                  //En esta columna hay que mostrar la vista de las RRSS
                  //seleccionadas y el campo para editarlas
                  //por eso dentro del componente Row (primera func arriba)
                  //le envío un view=1, así le estoy diciendo mira
                  //en esta parte de la vista tienes que mostrarme los campos
                  //para editar
                }
              </Form>
            )}
          </Formik>
          <div>
            {rows.length > 0 ? <hr className="hr-dashed" /> : null}
            {rows.map((row, index) => (
              <Row
                {...row}
                onChange={(name, value) => {
                  handleOnChange(index, name, value);
                }}
                onRemove={() => handleOnRemove(index)}
                key={index}
                view={1}
              />
            ))}
          </div>
        </div>

        {/*Columna en donde se van mostrando los cambios*/}
        <div className="bg-white col-sm-6">
          <div className="row">
            <img
              src={BackgroundImage}
              className="w-100"
              alt="backgroundImageProfile"
            />
          </div>
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-center">
              <img
                src={userImage}
                className="rounded-circle img-profile"
                alt="ProfilePhoto"
              />
            </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <label className="form-label">{nameState}</label>
            </div>
            <div className="col-sm-12 d-flex justify-content-center">
              <label className="pt-1 text-justify">{bioState}</label>
            </div>
          </div>
          <div className="row p-3 d-flex justify-content-around">
            {
              //Aquí es en donde muestro cómo va quedando el perfil
              //Si te fijas mapeo el mismo arreglo rows pero lo único
              //que cambia es el view=2, con esto le digo que me muestre
              //la vista determinada para ver en tiempo real como se va
              //mostrando el perfil
              //en este tipo de vista no se puede modificar nada
            }
            {rows.map((row, index) => (
              <Row
                {...row}
                onChange={(name, value) => {
                  handleOnChange(index, name, value);
                }}
                onRemove={() => handleOnRemove(index)}
                key={index}
                view={2}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
