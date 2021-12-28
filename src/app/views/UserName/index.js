import React, { useEffect, useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import userImage from "../../../assets/images/default-user-image.png";
import logoImage from "../../../assets/images/logo-white.png";
import noBanner from "../../../assets/images/no-banner.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import history from "../../../components/History";
import axios from "axios";
import helpers from "../../../components/Helpers";
import { SpinnerLoading } from "../../../components/SpinnerLoading";

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
import WhatsappIcon from "../../../assets/svg/whatsapp.svg";
import TelegramIcon from "../../../assets/svg/telegram.svg";
import GoFundMeIcon from "../../../assets/svg/gofundme.svg";
import TwitchIcon from "../../../assets/svg/twitch.svg";
import OnlyFansIcon from "../../../assets/svg/onlyfans.svg";
import DiscordIcon from "../../../assets/svg/discord.svg";
import HousePartyIcon from "../../../assets/svg/houseparty.svg";
import SmsIcon from "../../../assets/svg/sms.svg";
import PhoneIcon from "../../../assets/svg/phone.svg";
import WebsiteIcon from "../../../assets/svg/website.svg";
import CustomURLIcon from "../../../assets/svg/customurl.svg";
import CustomImageIcon from "../../../assets/svg/galleryimage.svg";
import CustomTextIcon from "../../../assets/svg/text.svg";

//Componentes hijos
import { SocialMedia } from "./childrenComponents/SocialMedia";
import { CustomLink } from "./childrenComponents/CustomLink";
import { CustomImage } from "./childrenComponents/CustomImage";
import { CustomText } from "./childrenComponents/CustomText";
import { YoutubeEmbedVideo } from "./childrenComponents/YoutubeEmbedVideo";
import { ProfileCarousel } from "./childrenComponents/ProfileCarousel";

const {
  swalOffBackend,
  convertStringWithPlus,
  copyToClipboard,
  copyTextToClipboard,
  shareLink,
} = helpers;
const QRCode = require("qrcode.react");

/*Componente para manejar nombre del usuario*/
export const UserName = ({ location }) => {
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [customImage, setCustomImage] = useState([]);
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil

  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");

  // const [isLinked, setIsLinked] = useState(false);
  // const [usernameLinked, setUsernameLinked] = useState("");

  const [sendNotifications2, setSendNotifications2] = useState(false);
  const [emailProfile, setEmailProfile] = useState("");
  const [sendingLocationButton, setSendingLocationButton] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { pathname } = location;
  const username = pathname.replace("/", "");

  const payload = {
    username: username /*Puede ser el usuario o el nro de serial*/,
  };

  useEffect(() => {
    axios
      .post("/users/usernameData", payload)
      .then((res) => {
        const { ok, msg, data, email, gallery, customImage } = res.data;

        //Guardamos el email
        setEmailProfile(email);

        if (ok && msg === "Username Profile Data found.") {
          const {
            profileFullName,
            profileBio,
            socialMedia,
            base64ProfilePhoto,
            base64BannerPhoto,
            sendNotifications,
          } = data;
          setProfileName(profileFullName);
          setSocialMedia(socialMedia);
          setProfileBio(profileBio);
          setProfileUsername(res.data.username);
          setGallery(gallery);
          setCustomImage(customImage);

          /*********PINTAMOS LA FOTO O EL BANNER***************/
          /* Depende de lo que retorne el servicio, pintamos ya sea el icon del perfil gris o
           * pintamos la ruta guardada como key en s3 de la imagen
           */
          if (base64ProfilePhoto === "") {
            setBase64ImgProfile(userImage);
          } else {
            setBase64ImgProfile(
              `${process.env.REACT_APP_API_URL}/render/image/${base64ProfilePhoto}`
            );
          }
          if (base64BannerPhoto === "") {
            setBase64ImgBanner(noBanner);
          } else {
            setBase64ImgBanner(
              `${process.env.REACT_APP_API_URL}/render/image/${base64BannerPhoto}`
            );
          }
          /***************************************************** */

          //Guardamos esto en una variable (no se usa de momento)
          setSendNotifications2(sendNotifications);
          //Envío el valor a ver si se va a enviar correo o no
          sendEmailNotifications(sendNotifications, email, 1);

          setLoadingProfileData(false);
        }
      })
      .catch((e) => {
        if (e.response === undefined) {
          swalOffBackend();
          setLoadingProfileData(false);
          history.push("/");
          return 1;
        }

        const { msg, ok } = e.response.data;
        if (!ok) {
          Swal.fire({
            title: "Error",
            text: msg,
            icon: "error",
            confirmButtonText: "Try again",
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/login");
            } else {
              history.push("/login");
            }
          });
        }
      });
  }, []);

  const sendEmailNotifications = (value, email, whereIsClicked) => {
    if (value === true && whereIsClicked === 1) {
      //Si el valor que recibe es true entonces enviamos el correo
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        const payloadToSendNotifications = {
          to: email,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log(payloadToSendNotifications);

        axios
          .post("email/sendNotification", payloadToSendNotifications)
          .then((res) => {
            if (res.data.ok === true) {
              console.log("Correo fue enviado");
            } else {
              console.log("Correo no fue enviado");
            }
          })
          .catch((error) => {
            console.log("Ha ocurrido un error al enviar correo");
          });
      });
    } else if (value === true && whereIsClicked === 2) {
      setSendingLocationButton(true);
      //Si el valor que recibe es true entonces enviamos el correo
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        const payloadToSendNotifications = {
          to: email,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        console.log(payloadToSendNotifications);

        axios
          .post("email/sendNotification", payloadToSendNotifications)
          .then((res) => {
            if (res.data.ok === true) {
              setSendingLocationButton(false);
              Swal.fire({
                title: "Everything's ok ;)",
                text: "GPS Location was sent succesfully",
                icon: "success",
                confirmButtonText: "OK",
              });
            } else {
              setSendingLocationButton(false);
              Swal.fire({
                title: "Error",
                text: "An error occurred",
                icon: "error",
                confirmButtonText: "Try again",
              });
            }
          })
          .catch((error) => {
            setSendingLocationButton(false);
            Swal.fire({
              title: "Error",
              text: "An error occurred",
              icon: "error",
              confirmButtonText: "Try again",
            });
          });
      });
    } else {
      console.log("Notifications disabled");
    }
  };

  const viewPrivateLinks = () => {
    Swal.fire({
      title: "PIN",
      html: `<input type="password" placeholder="PIN to unlock private information" 
            className="swal2-input" maxLength="4">`,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      {loadingProfileData === true ? (
        <SpinnerLoading />
      ) : (
        <div>
          {
            //style={{ width: "100%" }}
          }
          <div
            // style={{
            //   backgroundColor: "#424242",
            //   height: "200px",
            //   width: "100%",
            // }}
            className="banner-with-no-image"
          >
            <img
              src={base64ImgBanner}
              className="banner w-100"
              alt="backgroundImageProfile"
            />
          </div>
          <div
            className="col-sm-12 card-body"
            style={{ backgroundColor: "white" }}
          >
            <div className="row justify-content-center">
              <div className="box">
                <img
                  src={base64ImgProfile}
                  className="img-profile"
                  alt="ProfilePhoto"
                />
              </div>
            </div>

            <div className="row h5 mt-3">
              <div className="col-12 d-flex justify-content-center">
                <h3 className="font-bold">{profileName}</h3>
              </div>
            </div>

            <div className="row text-center h5">
              <div className="col-12 d-flex justify-content-center pre-wrap">
                <h5>{profileBio}</h5>
              </div>
            </div>

            {/*<div className="row">
                    <div className="col-sm-12 text-center">
                        <a  href="/edit-profile" className="mr-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Edit Profile</a>
                        <a className="ml-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Sign Out</a>
                    </div>
        </div>*/}

            <YoutubeEmbedVideo socialMedia={socialMedia} />

            {/*Componente de redes sociales visualizadas en el perfil*/}
            <SocialMedia
              socialMedia={socialMedia}
              YoutubeIcon={YoutubeIcon}
              TwitterIcon={TwitterIcon}
              WhatsappIcon={WhatsappIcon}
              InstagramIcon={InstagramIcon}
              FacebookIcon={FacebookIcon}
              EmailIcon={EmailIcon}
              PhoneIcon={PhoneIcon}
              SnapchatIcon={SnapchatIcon}
              SoundcloudIcon={SoundcloudIcon}
              LinkedinIcon={LinkedinIcon}
              TiktokIcon={TiktokIcon}
              SpotifyIcon={SpotifyIcon}
              AppleMusicIcon={AppleMusicIcon}
              VenmoIcon={VenmoIcon}
              CashappIcon={CashappIcon}
              WebsiteIcon={WebsiteIcon}
              PaypalIcon={PaypalIcon}
              TelegramIcon={TelegramIcon}
              OnlyFansIcon={OnlyFansIcon}
              GoFundMeIcon={GoFundMeIcon}
              TwitchIcon={TwitchIcon}
              DiscordIcon={DiscordIcon}
              HousePartyIcon={HousePartyIcon}
              SmsIcon={SmsIcon}
              convertStringWithPlus={convertStringWithPlus}
              MapPinIcon={MapPinIcon}
            />

            {/*Componentes de links customizados al visualizar el perfil*/}
            <CustomLink
              socialMedia={socialMedia}
              CustomURLIcon={CustomURLIcon}
            />

            {/*Componentes de links customizados al visualizar el perfil*/}
            <CustomImage
              customImage={customImage}
              CustomImageIcon={CustomImageIcon}
            />

            {/*Componentes de links customizados al visualizar el perfil*/}
            <CustomText
              socialMedia={socialMedia}
              CustomTextIcon={CustomTextIcon}
              copyTextToClipboard={copyTextToClipboard}
            />

            {/*Carrusel Imágenes*/}
            <ProfileCarousel gallery={gallery} />

            {/*Botón Copiar Link*/}
            <div className="row pt-2">
              <div className="col-6">
                <div className="d-flex justify-content-center">
                  <div className="border border-link">
                    <div className="d-flex justify-content-center">
                      <h5 className="font-bold pb-1 pt-2">QR Code</h5>
                    </div>
                    <QRCode
                      id="QR"
                      value={"https://profile.stdicompany.com/" + username}
                      className="m-1 p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-center">
                      <div className="border pt-3 pr-2 pb-3 pl-2 mr-1 border-link">
                        {/*Inicio Botón Copy Link */}
                        <div
                          className="d-flex justify-content-center"
                          style={{ marginTop: "4px" }}
                        >
                          {/* <Overlay
                            target={target.current}
                            show={show}
                            placement="top"
                          >
                            {(props) => (
                              <Tooltip id="overlay-example" {...props}>
                                Profile copied to clipboard!
                              </Tooltip>
                            )}
                          </Overlay> */}
                          <Button
                            //ref={target}
                            className="w-100"
                            onClick={() => {
                              setShow(!show);
                              copyToClipboard(profileUsername);
                              Swal.fire(
                                "Text copied to clipboard!",
                                "",
                                "success"
                              );
                            }}
                          >
                            <span>
                              <i className="bi bi-clipboard" />
                            </span>
                            &nbsp; Copy Link
                          </Button>
                        </div>

                        {/*Final Botón Copy Link */}

                        {/*Inicio Botón Share Link */}
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="success"
                            onClick={() => {
                              shareLink(profileUsername);
                            }}
                            className="mt-3 w-100"
                          >
                            <span>
                              <i className="bi bi-share" />
                            </span>
                            &nbsp; Share Link
                          </Button>
                        </div>
                        {/*Final Botón Share Link */}

                        {/*Inicio Botón Send GPS Location */}
                        {sendNotifications2 ? (
                          <div
                            className="d-flex justify-content-center"
                            style={{ marginBottom: "4px" }}
                          >
                            <Button
                              variant="danger"
                              onClick={() => {
                                sendEmailNotifications(true, emailProfile, 2);
                              }}
                              disabled={sendingLocationButton === true}
                              className="mt-3 w-100"
                            >
                              <div className="d-flex d-inline-block justify-content-center">
                                <span
                                  className="spinner-border spinner-border-sm mt-1 mr-2"
                                  role="status"
                                  style={{
                                    display:
                                      sendingLocationButton === true
                                        ? "inline-block"
                                        : "none",
                                  }}
                                  aria-hidden="true"
                                ></span>
                                {sendingLocationButton === true ? (
                                  " Loading"
                                ) : (
                                  <>
                                    <span>Send Location</span>
                                  </>
                                )}
                              </div>
                            </Button>
                          </div>
                        ) : null}
                        {/*Final Botón Send GPS Location*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-3">
              <div className="col-lg-12">
                <div id="map"></div>
              </div>
            </div>
          </div>

          <div className="alert-information">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <a
                  className="text-white font-bold text-center"
                  href="https://shop.stdicompany.com/"
                  target="_blank"
                >
                  STDI rocks, right? Tap here to get yours.
                </a>
                <b
                  style={{
                    fontSize: "30px",
                  }}
                  className="text-white text-center pr-1 pl-1"
                >
                  |
                </b>
                <a
                  className="text-white font-bold text-center"
                  href="https://profile.stdicompany.com/login"
                  target="_blank"
                >
                  Want to set up? Tap here to log in.
                </a>
              </div>
            </div>
          </div>

          <div className="pt-3 text-white">
            <div className="col-12 col-sm-12">
              <div className="d-flex justify-content-center">
                <a href="https://www.stdicompany.com/">
                  <img className="img-profile-logo" src={logoImage} />
                </a>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <h5 className="font-bold">STDI Company</h5>
              </div>
              <div className="d-flex justify-content-center">
                <h6>All features registered &copy;</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
