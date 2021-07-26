import React, { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Form,
  InputGroup,
  Alert,
  Button,
  Overlay,
  Tooltip,
} from "react-bootstrap";
import Swal from "sweetalert2";
//import { SetChanges } from "./childComponent/SetChanges";
import * as Icon from "react-bootstrap-icons";
import userImage from "../../../assets/images/default-user-image.png";
import history from "../../../components/History";
import BannerImage from "../../../assets/images/no-banner.jpg";
import { AppContext } from "../../../components/AppContext";
import helpers from "../../../components/Helpers";
import { SpinnerLoading } from "../../../components/SpinnerLoading";
import ModalChangePassword from "./childrenComponents/ModalChangePassword";
import axios from "axios";

/*Iconos que no están en boostrap-icons.css*/
import YoutubeIcon from "../../../assets/svg/youtube.svg";
import InstagramIcon from "../../../assets/svg/instagram.svg";
import TwitterIcon from "../../../assets/svg/twitter.svg";
import FacebookIcon from "../../../assets/svg/facebook.svg";
import LinkedinIcon from "../../../assets/svg/linkedin.svg";
import SnapchatIcon from "../../../assets/svg/snapchat.svg";
import AppleMusicIcon from "../../../assets/svg/apple-music.svg";
import CashappIcon from "../../../assets/svg/cashapp.svg";
import SoundcloudIcon from "../../../assets/svg/soundcloud.svg";
import SpotifyIcon from "../../../assets/svg/spotify.svg";
import TiktokIcon from "../../../assets/svg/tiktok.svg";
import VenmoIcon from "../../../assets/svg/venmo.svg";
import PaypalIcon from "../../../assets/svg/paypal.svg";
import MapPinIcon from "../../../assets/svg/locationmap.svg";
import EmailIcon from "../../../assets/svg/mail.svg";
import PhoneIcon from "../../../assets/svg/phone.svg";
import WhatsappIcon from "../../../assets/svg/whatsapp.svg";
import TelegramIcon from "../../../assets/svg/telegram.svg";
import SmsIcon from "../../../assets/svg/sms.svg";
import WebsiteIcon from "../../../assets/svg/website.svg";
import CustomURLIcon from "../../../assets/svg/customurl.svg";

const QRCode = require("qrcode.react");

const { swalOffBackend, convertStringWithPlus, copyToClipboard } = helpers;

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
  convertStringWithPlus,
  //socialNetworkIcon,
  //socialNetworkURL,
}) {
  return (
    <>
      {view === 1 ? (
        <div className="row mb-2">
          <div className="col-12 col-sm-12">
            <label className="text-white">{socialNetwork}</label>
            <InputGroup>
              <Form.Control
                name="profile"
                value={profile}
                onChange={(e) => onChange("profile", e.target.value)}
                placeholder={
                  socialNetwork === "Instagram"
                    ? "Instagram username"
                    : socialNetwork === "Snapchat"
                    ? "Snapchat username"
                    : socialNetwork === "Whatsapp"
                    ? "Country code and phone number"
                    : socialNetwork === "Youtube"
                    ? "Full link"
                    : socialNetwork === "Facebook"
                    ? "Full link"
                    : socialNetwork === "Soundcloud"
                    ? "Souncloud username"
                    : socialNetwork === "Linkedin"
                    ? "Full link"
                    : socialNetwork === "TikTok"
                    ? "Tiktok username"
                    : socialNetwork === "Twitter"
                    ? "Twitter username"
                    : socialNetwork === "Spotify"
                    ? "Spotify username"
                    : socialNetwork === "Apple Music"
                    ? "Apple Music username"
                    : socialNetwork === "Venmo"
                    ? "Venmo username"
                    : socialNetwork === "CashApp"
                    ? "Cashapp username"
                    : socialNetwork === "Address"
                    ? "Complete address"
                    : socialNetwork === "Phone Number"
                    ? "Country code and phone number"
                    : socialNetwork === "Email"
                    ? "Email address"
                    : socialNetwork === "SMS"
                    ? "Country code and phone number"
                    : socialNetwork === "Paypal"
                    ? "Paypal username"
                    : socialNetwork === "Telegram"
                    ? "Telegram username"
                    : "Full link"
                }
              />
              <InputGroup.Append>
                <Button variant="danger" onClick={onRemove}>
                  <Icon.XCircleFill />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      ) : (
        <>
          <div className="border border-link m-2 col-3">
            <a
              className="btn-no-style"
              target="_blank"
              href={
                socialNetwork === "Instagram"
                  ? "https://www.instagram.com/" + profile
                  : socialNetwork === "Snapchat"
                  ? "https://www.snapchat.com/" + profile
                  : socialNetwork === "Whatsapp"
                  ? "https://wa.me/" + profile
                  : socialNetwork === "Youtube"
                  ? profile
                  : socialNetwork === "Facebook"
                  ? profile
                  : socialNetwork === "Soundcloud"
                  ? "https://www.soundcloud.com/add/" + profile
                  : socialNetwork === "Linkedin"
                  ? profile
                  : socialNetwork === "TikTok"
                  ? "https://www.tiktok.com/@" + profile
                  : socialNetwork === "Twitter"
                  ? "https://www.twitter.com/" + profile
                  : socialNetwork === "Spotify"
                  ? "https://www.spotify.com/" + profile
                  : socialNetwork === "Apple Music"
                  ? "https://music.apple.com/" + profile
                  : socialNetwork === "Venmo"
                  ? "https://www.venmo.com/" + profile
                  : socialNetwork === "CashApp"
                  ? "https://cash.app/$" + profile
                  : socialNetwork === "Address"
                  ? "https://www.google.com/maps/search/" +
                    convertStringWithPlus(profile)
                  : socialNetwork === "Phone Number"
                  ? "tel:" + profile
                  : socialNetwork === "Email"
                  ? "mailto:" + profile
                  : socialNetwork === "SMS"
                  ? "sms:" + profile
                  : socialNetwork === "Paypal"
                  ? "https://paypal.com/" + profile
                  : socialNetwork === "Telegram"
                  ? "https://t.me/" + profile
                  : profile
              }
            >
              <div className="pt-3 pb-3">
                <div className="d-flex justify-content-center">
                  {socialNetwork === "Instagram" ? (
                    <img
                      width="50"
                      height="50"
                      src={InstagramIcon}
                      alt="Instagram"
                    />
                  ) : socialNetwork === "Whatsapp" ? (
                    <img
                      width="50"
                      height="50"
                      src={WhatsappIcon}
                      alt="Whatsapp"
                    />
                  ) : socialNetwork === "Snapchat" ? (
                    <img
                      width="50"
                      height="50"
                      src={SnapchatIcon}
                      alt="Snapchat"
                    />
                  ) : socialNetwork === "Youtube" ? (
                    <img
                      width="50"
                      height="50"
                      src={YoutubeIcon}
                      alt="Youtube"
                    />
                  ) : socialNetwork === "Facebook" ? (
                    <img
                      width="50"
                      height="50"
                      src={FacebookIcon}
                      alt="Facebook"
                    />
                  ) : socialNetwork === "Soundcloud" ? (
                    <img
                      width="50"
                      height="50"
                      src={SoundcloudIcon}
                      alt="Soundcloud"
                    />
                  ) : socialNetwork === "Linkedin" ? (
                    <img
                      width="50"
                      height="50"
                      src={LinkedinIcon}
                      alt="Linkedin"
                    />
                  ) : socialNetwork === "TikTok" ? (
                    <img width="50" height="50" src={TiktokIcon} alt="TikTok" />
                  ) : socialNetwork === "Twitter" ? (
                    <img
                      width="50"
                      height="50"
                      src={TwitterIcon}
                      alt="Twitter"
                    />
                  ) : socialNetwork === "Spotify" ? (
                    <img
                      width="50"
                      height="50"
                      src={SpotifyIcon}
                      alt="Spotify"
                    />
                  ) : socialNetwork === "Apple Music" ? (
                    <img
                      width="50"
                      height="50"
                      src={AppleMusicIcon}
                      alt="Apple Music"
                    />
                  ) : socialNetwork === "Venmo" ? (
                    <img width="50" height="50" src={VenmoIcon} alt="Venmo" />
                  ) : socialNetwork === "CashApp" ? (
                    <img
                      width="50"
                      height="50"
                      src={CashappIcon}
                      alt="CashApp"
                    />
                  ) : socialNetwork === "Phone Number" ? (
                    <img width="50" height="50" src={PhoneIcon} alt="Phone" />
                  ) : socialNetwork === "Email" ? (
                    <img width="50" height="50" src={EmailIcon} alt="Email" />
                  ) : socialNetwork === "Website" ? (
                    <img
                      width="50"
                      height="50"
                      src={WebsiteIcon}
                      alt="Website"
                    />
                  ) : socialNetwork === "CustomURL" ? (
                    <img
                      width="50"
                      height="50"
                      src={CustomURLIcon}
                      alt="CustomURL"
                    />
                  ) : socialNetwork === "Address" ? (
                    <img
                      width="50"
                      height="50"
                      src={MapPinIcon}
                      alt="Google Maps"
                    />
                  ) : socialNetwork === "SMS" ? (
                    <img width="50" height="50" src={SmsIcon} alt="SMS" />
                  ) : socialNetwork === "Paypal" ? (
                    <img width="50" height="50" src={PaypalIcon} alt="Paypal" />
                  ) : socialNetwork === "Telegram" ? (
                    <img
                      width="50"
                      height="50"
                      src={TelegramIcon}
                      alt="Telegram"
                    />
                  ) : (
                    profile
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <h6>{socialNetwork}</h6>
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
  const [existentProfile, setExistentProfile] = useState(true);
  const [nameState, setNameState] = useState("");
  const [bioState, setBioState] = useState("");
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil
  const [profileData, setProfileData] = useState([]); //Este de momento no se usa
  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");
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
          title: "This session is over :(",
          text: "Please login again",
          icon: "Error",
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
      setRows(
        rows.concat({
          socialNetwork: e.target.value,
          profile: "",
          //socialNetworkIcon: e.target.value === "Instagram" ? <Icon.Instagram /> : null,
          //socialNetworkIcon: findIcon(e.target.value),
          //socialNetworkURL: findURL(e.target.value),
        })
      );
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

  const [formEditProfile, setFormEditProfile] = useForm({
    button: null,
    bio: null,
    socialMedia: null,
  });

  const handleSocialMedia = (e) => {
    setFormEditProfile(e);
    console.log(formEditProfile);
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
                        <Form.Label
                          className="text-white form-label"
                          htmlFor="basic-url"
                        >
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
                            isValid={!!touched.fullName && !errors.fullName}
                            isInvalid={!!errors.fullName && !!touched.fullName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                          </Form.Control.Feedback>
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
                        <Form.Label
                          className="text-white form-label"
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
                        <Form.Label
                          className="text-white form-label"
                          htmlFor="basic-url"
                        >
                          Social Media Channels:
                        </Form.Label>
                        <Alert variant="info">
                          <Icon.ListCheck size={25} />
                          &nbsp; Click from the drop down to add the social
                          media link.
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
                            <option value="Address">Address</option>
                            <option value="Email">Email</option>
                            <option value="SMS">SMS</option>
                            <option value="Website">Website</option>
                            <option value="CustomURL">CustomURL</option>
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
                                    disabledButton === true
                                      ? "inline-block"
                                      : "none",
                                }}
                                aria-hidden="true"
                              ></span>
                              {disabledButton === true ? (
                                " Loading, please wait..."
                              ) : (
                                <>
                                  <Icon.PersonLinesFill className="mt-1" />
                                  &nbsp;&nbsp;
                                  <span>Upload Changes</span>
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
