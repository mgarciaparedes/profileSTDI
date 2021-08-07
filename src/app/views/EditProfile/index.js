import React, { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import Swal from "sweetalert2";
import * as Icon from "react-bootstrap-icons";
import userImage from "../../../assets/images/default-user-image.png";
import history from "../../../components/History";
import BannerImage from "../../../assets/images/no-banner.jpg";
import { AppContext } from "../../../components/AppContext";
import helpers from "../../../components/Helpers";
import axios from "axios";

//Componentes Reusables
import { SpinnerLoading } from "../../../components/SpinnerLoading";

//Componentes Hijos
import ModalChangePassword from "./childrenComponents/ModalChangePassword";
import NoDymanicForm from "./childrenComponents/NoDymanicForm";
import Row from "./childrenComponents/Row";

//Ícono
import CustomURLIcon from "../../../assets/svg/customurl.svg";

const QRCode = require("qrcode.react");

const { swalOffBackend, convertStringWithPlus, copyToClipboard } = helpers;

export const EditProfile = () => {
  const [existentProfile, setExistentProfile] = useState(true);
  const [nameState, setNameState] = useState("");
  const [bioState, setBioState] = useState("");
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil
  const [profileData, setProfileData] = useState([]); //Este de momento no se usa
  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");
  const [sendNotifications, setSendNotifications] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  //para enviar al módulo de changePassword
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [email, setEmail] = useState("");

  const { objLogin, logoutContext } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("/users/getProfileUserData")
      .then((res) => {
        console.log(res.data);
        if (res.data.ok === false) {
          setExistentProfile(false); //Diferenciar si se le pega al servicio save
          setLoadingProfileData(false);
          //Esto pasa en caso de que exista el usuario registrado pero no tenga ningún perfil asociado
          //tiene que guardar el username para wue al momento de revisar su QR, copiar el link o al terminar
          //de hacer su primer registro se pueda redirigir hacia su username
          setUsername(res.data.username);
          Swal.fire({
            title: "Hi, welcome to STDI profiles",
            text: "Save your data to see your profile ;)",
            icon: "info",
            confirmButtonText: "OK",
          });
        } else {
          setExistentProfile(true); //Diferenciar si se le pega al servicio update
          setNameState(res.data.data.profileFullName);
          setBioState(res.data.data.profileBio);
          setUsername(res.data.username);
          setProfileData(res.data.data.socialMedia);
          setBase64ImgProfile(res.data.data.base64ProfilePhoto);
          setBase64ImgBanner(res.data.data.base64BannerPhoto);
          setRows(res.data.data.socialMedia); //Aquí guardo si es que el profile tiene alguna red social
          setLoadingProfileData(false);
          setSendNotifications(res.data.data.sendNotifications);

          //para enviar al ChangePassword
          setName(res.data.name);
          setEmail(res.data.email);
          setSerialNumber(res.data.serialNumber);
        }
      })
      .catch((error) => {
        setExistentProfile(false);
        setLoadingProfileData(false);
        Swal.fire({
          title: "This session is over",
          text: "Please login again",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            history.push("/");
          } else {
            history.push("/");
          }
        });
      });
    console.log("Se ejecuta EditProfile");
  }, []);

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
  const handleOnAdd = (e) => {
    //Aquí valido que si eligen choose your media no se agregue nada
    if (e.target.value !== "") {
      //el campo CustomURL va a guardar otro dato -> el nombre del link
      //Entonces dependiendo de la red social elegida digo si va a guardar ese dato extra o no
      if (e.target.value === "CustomURL") {
        setRows(
          rows.concat({
            socialNetwork: e.target.value,
            profile: "",
            linkName: "",
          })
        );
      } else {
        setRows(
          rows.concat({
            socialNetwork: e.target.value,
            profile: "",
          })
        );
      }
    }
  };

  //Función que elimina una fila determinada.
  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };

  const handleNameChange = (e) => {
    setNameState(e.target.value);
  };

  const handleBioChange = (e) => {
    setBioState(e.target.value);
  };

  //Función que convierte imágenes a base64
  const reader = new FileReader();
  reader.onloadend = () => {
    // use a regex to remove data url part
    const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");

    setBase64ImgProfile(base64String);
  };

  const reader2 = new FileReader();
  reader2.onloadend = () => {
    // use a regex to remove data url part
    const base64String2 = reader2.result
      .replace("data:", "")
      .replace(/^.+,/, "");

    setBase64ImgBanner(base64String2);
  };

  //Función que borra todas las rrss del perfil
  const clearData = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If you clear your profile it will be empty.",
      icon: "info",
      confirmButtonText: "Yes, wipe out",
      showCancelButton: true,
      cancelButtonText: "No, go back",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setRows([]);
        setNameState("");
        setBioState("");
        setBase64ImgProfile("");
        setBase64ImgBanner("");
      }
    });
  };

  const noBlankSpaces = () => {
    return rows.some(function (el) {
      return el.profile === "";
    });
  };

  const onSubmit = () => {
    setDisabledButton(true);
    console.log(rows);
    const checkFields = noBlankSpaces();

    const payload = {
      profileFullName: nameState,
      base64ProfilePhoto: base64ImgProfile,
      base64BannerPhoto: base64ImgBanner,
      profileBio: bioState,
      socialMedia: rows,
      sendNotifications: sendNotifications,
    };

    if (checkFields === true) {
      setDisabledButton(false);

      Swal.fire({
        title: "Please check your fields",
        text: "Can't save a social network without profile",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      if (nameState === "") {
        setDisabledButton(false);
        Swal.fire({
          title: "Profile Fullname is required",
          text: "We need at least this information to save your profile",
          icon: "info",
          confirmButtonText: "OK",
        });
      } else {
        if (existentProfile === false) {
          //Si existentProfile es false, quiere decir que no existe un perfil guardado para este usuario
          //Eso quiere decir que le pega al servicio de saveProfileUserData
          axios
            .post("/users/saveProfileUserData", payload)
            .then((res) => {
              const { ok, msg } = res.data;

              if (ok === true) {
                setDisabledButton(false);
                //Activar al usuario para que pueda modificar luego de la primera inserción en la BBDD
                setExistentProfile(true);
                Swal.fire({
                  title: "Great! This is your first profile.",
                  text: "Check your profile ;)",
                  icon: "success",
                  confirmButtonText: "Go to check profile",
                  showCancelButton: true,
                  cancelButtonText: "No, thats ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window
                      .open(
                        "https://profile.stdicompany.com/" + username,
                        "_blank"
                      )
                      .focus();
                  }
                });
              } else {
                setDisabledButton(false);
                Swal.fire({
                  title: "Sorry. Try again please! 1",
                  text: msg,
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            })
            .catch((error) => {
              setDisabledButton(false);
              Swal.fire({
                title: "Sorry. There was a crash",
                text: "Please close this session and login again.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        } else {
          //Si existentProfile es true, quiere decir que no existe un perfil guardado para este usuario
          //Eso quiere decir que le pega al servicio de updateProfileUserData
          axios
            .post("/users/updateProfileUserData", payload)
            .then((res) => {
              const { ok, msg } = res.data;

              if (ok === true) {
                setDisabledButton(false);
                Swal.fire({
                  title: "Changes have been updated",
                  text: "Check your profile ;)",
                  icon: "success",
                  confirmButtonText: "Go to check profile",
                  showCancelButton: true,
                  cancelButtonText: "No, thats ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window
                      .open(
                        "https://profile.stdicompany.com/" + username,
                        "_blank"
                      )
                      .focus();
                  }
                });
              } else {
                setDisabledButton(false);
                Swal.fire({
                  title: "Sorry. Try again please!",
                  text: msg,
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            })
            .catch((error) => {
              setDisabledButton(false);
              Swal.fire({
                title: "Sorry. There was a crash",
                text: "Please close this session and login again.",
                icon: "error",
                confirmButtonText: "OK",
              });
            });
        }
      }
    }
  };

  return (
    <>
      {loadingProfileData === true ? (
        <SpinnerLoading />
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col-sm-12 d-flex justify-content-end">
              <div className="text-white mt-2">
                {objLogin.userName}&nbsp;&nbsp;
              </div>
              <ModalChangePassword
                name={name}
                username={username}
                serialNumber={serialNumber}
                email={email}
              />
              &nbsp;&nbsp;
              <Button
                variant="danger"
                onClick={() => {
                  //history.push("/login");
                  logoutContext();
                }}
              >
                <Icon.Power size={20} />
              </Button>
            </div>
          </div>

          <div className="mt-5 row">
            <div
              className="
              col-sm-6 col-md-6"
            >
              {/*Comienzo de parte de formulario no dinámico nombre, bio, imágenes*/}
              <NoDymanicForm
                nameState={nameState}
                bioState={bioState}
                sendNotifications={sendNotifications}
                setSendNotifications={setSendNotifications}
                disabledButton={disabledButton}
                reader={reader}
                reader2={reader2}
                onSubmit={onSubmit}
                handleOnAdd={handleOnAdd}
                handleNameChange={handleNameChange}
                handleBioChange={handleBioChange}
                setBase64ImgBanner={setBase64ImgBanner}
                clearData={clearData}
              />

              {/*Comienzo de sección en donde se van mostrando los campos para escribir las rrss*/}
              <div>
                {rows.length > 0 ? <hr className="hr" /> : null}
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
            <div className="col-sm-6">
              <div className="d-md-none">
                <hr className="hr" />
              </div>
              <div className="bg-white">
                <div className="row">
                  <div className="col-sm-12">
                    <img
                      src={
                        base64ImgBanner === ""
                          ? BannerImage
                          : `data:image/jpeg;base64,${base64ImgBanner}`
                      }
                      style={{
                        height: "250px",
                      }}
                      className="w-100"
                      alt="backgroundImageProfile"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-center">
                    <img
                      src={
                        base64ImgProfile === ""
                          ? userImage
                          : `data:image/jpeg;base64,${base64ImgProfile}`
                      }
                      className="rounded-circle img-profile"
                      alt="ProfilePhoto"
                    />
                  </div>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <label className="form-label mt-3">{nameState}</label>
                  </div>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <label className="pt-1 text-justify">{bioState}</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {rows.map((elemento, index) => (
                      <div key={index}>
                        {elemento.socialNetwork === "Embed Youtube Video" ? (
                          <div className="p-3 w100 d-flex justify-content-center">
                            <iframe
                              width="560"
                              height="315"
                              src={
                                "https://www.youtube.com/embed/" +
                                elemento.profile
                              }
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : null}
                      </div>
                    ))}
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
                  {loadingProfileData === true ? (
                    <div className="d-flex d-inline-block justify-content-center">
                      <span
                        className="spinner-grow spinner-grow-sm mt-1 mr-2"
                        role="status"
                        style={{
                          display: "inlineBlock",
                        }}
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </div>
                  ) : (
                    rows.map((row, index) => (
                      <Row
                        {...row}
                        onChange={(name, value) => {
                          handleOnChange(index, name, value);
                        }}
                        onRemove={() => handleOnRemove(index)}
                        key={index}
                        view={2}
                        convertStringWithPlus={convertStringWithPlus}
                      />
                    ))
                  )}
                </div>
                {rows.map((elemento, index) => (
                  <div key={index}>
                    {elemento.socialNetwork === "CustomURL" ? (
                      <div className="row d-flex justify-content-center h5 pb-3">
                        <div className="border p-2 border-link col-10">
                          <a
                            className="btn-no-style"
                            target="_blank"
                            href={elemento.profile}
                          >
                            <div className="d-flex col-lg-12 justify-content-center">
                              <img
                                className="mt-1"
                                width="25"
                                height="25"
                                src={CustomURLIcon}
                                alt="CustomURL"
                              />
                              &nbsp;
                              {elemento.linkName}
                            </div>
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="row mt-1">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-center">
                      <div className="border p-3 border-link">
                        <Button
                          ref={target}
                          onClick={() => {
                            setShow(!show);
                            copyToClipboard(username);
                          }}
                        >
                          <span>
                            <i className="bi bi-clipboard" />
                          </span>
                          &nbsp; Copy Link
                        </Button>
                        <Overlay
                          target={target.current}
                          show={show}
                          placement="top"
                        >
                          {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                              Profile copied to clipboard!
                            </Tooltip>
                          )}
                        </Overlay>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="d-flex justify-content-center">
                      <div className="border p-3 border-link">
                        <h5 className="font-bold pb-3 text-center">QR Code</h5>
                        <QRCode
                          value={"https://profile.stdicompany.com/" + username}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3 mb-3">
                      <a
                        target="_blank"
                        href={"https://profile.stdicompany.com/" + username}
                      >
                        Tap here to see your profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Fin de Formulario y muestra en vivo de como va quedando el perfil*/}

          {/*Margen inferior*/}
          <div className="mt-5"></div>
        </div>
      )}
    </>
  );
};
