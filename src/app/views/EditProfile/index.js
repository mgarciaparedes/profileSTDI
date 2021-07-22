import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hooks-helper";
import { Formik } from "formik";
import { Form, InputGroup, Alert, Button } from "react-bootstrap";
import Swal from "sweetalert2";
//import { SetChanges } from "./childComponent/SetChanges";
import * as Icon from "react-bootstrap-icons";
import userImage from "../../../assets/images/default-user-image.png";
import IconX from "../../../assets/images/icon-eliminate.png";
import BannerImage from "../../../assets/images/background.svg";
import history from "../../../components/History";
import { AppContext } from "../../../components/AppContext";
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
import WebsiteIcon from "../../../assets/svg/website.svg";
import CustomURLIcon from "../../../assets/svg/customurl.svg";

const QRCode = require("qrcode.react");

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
          <div className="border border-link m-2 col-3">
            <a
              className="btn-no-style"
              target="_blank"
              href={
                socialNetwork === "Instagram"
                  ? "https://www.instagram.com/" + profile
                  : socialNetwork === "Snapchat"
                  ? "https://www.snapchat.com/" + profile
                  : socialNetwork === "Youtube"
                  ? "https://www.youtube.com/" + profile
                  : socialNetwork === "Facebook"
                  ? "https://www.facebook.com/" + profile
                  : socialNetwork === "Soundcloud"
                  ? "https://www.soundcloud.com/" + profile
                  : socialNetwork === "Linkedin"
                  ? "https://www.linkedin.com/" + profile
                  : socialNetwork === "TikTok"
                  ? "https://www.tiktok.com/" + profile
                  : socialNetwork === "Twitter"
                  ? "https://www.twitter.com/" + profile
                  : socialNetwork === "Spotify"
                  ? "https://www.spotify.com/" + profile
                  : socialNetwork === "Apple Music"
                  ? "https://www.apple.com/" + profile
                  : socialNetwork === "Venmo"
                  ? "https://www.venmo.com/" + profile
                  : socialNetwork === "CashApp"
                  ? "https://www.cashapp.com/" + profile
                  : socialNetwork === "Address"
                  ? "https://www.google.com/maps/search/" +
                    convertStringWithPlus(profile)
                  : socialNetwork === "Phone Number"
                  ? "tel:" + profile
                  : socialNetwork === "Email"
                  ? "mailto:" + profile
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
                    <img
                    width="50"
                    height="50"
                    src={TiktokIcon}
                    alt="TikTok"
                  />
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
                    <img
                    width="50"
                    height="50"
                    src={VenmoIcon}
                    alt="Venmo"
                  />
                  ) : socialNetwork === "CashApp" ? (
                    <img
                    width="50"
                    height="50"
                    src={CashappIcon}
                    alt="CashApp"
                  />
                  ) : socialNetwork === "Phone Number" ? (
                    <img
                    width="50"
                    height="50"
                    src={PhoneIcon}
                    alt="Phone"
                  />
                  ) : socialNetwork === "Email" ? (
                    <img
                    width="50"
                    height="50"
                    src={EmailIcon}
                    alt="Email"
                  />
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
                  ): socialNetwork === "Paypal" ? (
                    <img
                    width="50"
                    height="50"
                    src={PaypalIcon}
                    alt="Paypal"
                  />
                  ): (
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
  const [username, setUsername] = useState("");
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil
  const [profileData, setProfileData] = useState([]); //Este de momento no se usa
  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const { objLogin, logoutContext } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("/users/getProfileUserData")
      .then((res) => {
        console.log(res.data);
        if (res.data.ok === false) {
          setExistentProfile(false); //Diferenciar si se le pega al servicio save
          setLoadingProfileData(false);
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
        }
      })
      .catch((error) => {
        setExistentProfile(false);
        setLoadingProfileData(false);
        Swal.fire({
          title: "Hi, welcome to STDI profiles",
          text: "Save your data to see your profile ;)",
          icon: "info",
          confirmButtonText: "OK",
        });
      });
    console.log("Se ejecuta EditProfile");
  }, []);

  //Esto no le pares, es la prueba del useCallback del Curso
  //const [counter,setCounter] = useState(10);

  // const increment = useCallback( () => {
  //   setCounter(c => c + 1);
  // }, [setCounter]);

  //Convertir espacios en signos de plus
  const convertStringWithPlus = (value) => {
    const newString = value.replace(" ", "+");
    return newString;
  };

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
        //socialNetworkIcon: findIcon(e.target.value),
        //socialNetworkURL: findURL(e.target.value),
      })
    );
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

  const onSubmit = () => {
    setDisabledButton(true);
    //console.log(rows);

    const payload = {
      profileFullName: nameState,
      base64ProfilePhoto: base64ImgProfile,
      base64BannerPhoto: base64ImgBanner,
      profileBio: bioState,
      socialMedia: rows,
    };

    if (existentProfile === false) {
      //Si existentProfile es false, quiere decir que no existe un perfil guardado para este usuario
      //Eso quiere decir que le pega al servicio de saveProfileUserData
      axios
        .post("/users/saveProfileUserData", payload)
        .then((res) => {
          const { ok, msg } = res.data;

          if (ok === true) {
            setDisabledButton(false);
            setExistentProfile(true); //Activar al usuario para que pueda logear
            Swal.fire({
              title: "Great! This is your first profile.",
              text: "Check your profile ;)",
              icon: "success",
              confirmButtonText: "Go to check profile",
              showCancelButton: true,
              cancelButtonText: "No, thats ok",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                window.open("https://profile.stdicompany.com/"+username, '_blank').focus();
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
            title: "Sorry. Try again please! 2",
            text: "",
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
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                window.open("https://profile.stdicompany.com/"+username, '_blank').focus();
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
            title: "Sorry. Try again please!",
            text: "",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }

    /*setTimeout(() => {
      setDisabledButton(false);
      Swal.fire({
        title: "Changes have been updated",
        text: "Check your profile ;)",
        icon: "success",
        confirmButtonText: "OK",
      });
    }, 2000);*/
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12 col-md-12 d-flex justify-content-end">
          <div className="text-white mt-2">{objLogin.userName}&nbsp;&nbsp;</div>
          <Button
            variant="primary"
            onClick={() => {
              //history.push("/login");
              logoutContext();
            }}
          >
            <div className="d-flex d-inline-block justify-content-center">
              Sign Out
            </div>
          </Button>
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
                //noValidate
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
                        //alert("cambió");
                        console.log(e.target.files);
                        if (e.target.files.length > 0) {
                          reader.readAsDataURL(e.target.files[0]);
                        } else {
                          setBase64ImgProfile("");
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
                        //alert("cambió");
                        console.log(e.target.files);
                        if (e.target.files.length > 0) {
                          reader2.readAsDataURL(e.target.files[0]);
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
                    <option value="Paypal">Paypal</option>
                    <option value="Address">Address</option>
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
        <div className="bg-white col-sm-6">
          <div className="row">
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
                    display: "inline-block",
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
          <div className="row p-3">
            <div className="col-lg-12">
              <div className="d-flex justify-content-center">
                <QRCode value={"https://profile.stdicompany.com/" + username} />
              </div>
              <div className="d-flex justify-content-center mt-3">
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
    </>
  );
};
