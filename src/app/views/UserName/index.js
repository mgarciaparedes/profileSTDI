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
import SmsIcon from "../../../assets/svg/sms.svg";
import PhoneIcon from "../../../assets/svg/phone.svg";
import WebsiteIcon from "../../../assets/svg/website.svg";
import CustomURLIcon from "../../../assets/svg/customurl.svg";

const { swalOffBackend, convertStringWithPlus, copyToClipboard } = helpers;
const QRCode = require("qrcode.react");

/*Componente para manejar nombre del usuario*/
export const UserName = ({ location }) => {
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);
  const [loadingProfileData, setLoadingProfileData] = useState(true); //Animación cargando datos de perfil
  const [base64ImgProfile, setBase64ImgProfile] = useState("");
  const [base64ImgBanner, setBase64ImgBanner] = useState("");
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { pathname } = location;
  const username = pathname.replace("/", "");

  const payload = {
    username: username,
  };

  useEffect(() => {
    axios
      .post("/users/usernameData", payload)
      .then((res) => {
        const { ok, msg, data } = res.data;

        if (ok && msg === "Username Profile Data found.") {
          const {
            profileFullName,
            profileBio,
            socialMedia,
            base64ProfilePhoto,
            base64BannerPhoto,
          } = data;
          setProfileName(profileFullName);
          setSocialMedia(socialMedia);
          setProfileBio(profileBio);
          setBase64ImgProfile(base64ProfilePhoto);
          setBase64ImgBanner(base64BannerPhoto);
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
            style={{
              backgroundColor: "#424242",
              height: "250px",
              width: "100%",
            }}
          >
            <img
              src={
                base64ImgBanner === ""
                  ? noBanner
                  : `data:image/jpeg;base64,${base64ImgBanner}`
              }
              style={{
                height: "250px",
              }}
              className="w-100"
              alt="backgroundImageProfile"
            />
          </div>
          <div
            className="col-sm-12 card-body"
            style={{ backgroundColor: "white" }}
          >
            <div className="row justify-content-center">
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

            <div className="row d-flex justify-content-center h5 mt-3">
              <h3 className="font-bold">{profileName}</h3>
            </div>

            <div className="row d-flex justify-content-center h5">
              <h5>{profileBio}</h5>
            </div>

            {/*<div className="row">
                    <div className="col-sm-12 text-center">
                        <a  href="/edit-profile" className="mr-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Edit Profile</a>
                        <a className="ml-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Sign Out</a>
                    </div>
        </div>*/}

            <div className="row d-flex justify-content-center h5">
              {socialMedia.map((elemento, index) => (
                <div key={index} className="border border-link m-2 col-3">
                  {
                    /*Según la red que responde el servicio, condicionamos que red social mostrar*/
                    elemento.socialNetwork === "Youtube" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={YoutubeIcon}
                              alt="Youtube"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Youtube</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Twitter" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.twitter.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={TwitterIcon}
                              alt="Twitter"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Twitter</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Whatsapp" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.wa.me/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={WhatsappIcon}
                              alt="Whatsapp"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Whatsapp</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Instagram" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.instagram.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={InstagramIcon}
                              alt="Instagram"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Instagram</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Facebook" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.facebook.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={FacebookIcon}
                              alt="Facebook"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Facebook</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Email" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"mailto:" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={EmailIcon}
                              alt="Email"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Email</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Phone Number" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"tel:" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={PhoneIcon}
                              alt="Phone"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">
                              Phone Number
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Snapchat" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.snapchat.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={SnapchatIcon}
                              alt="Snapchat"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Snapchat</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Soundcloud" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.soundcloud.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={SoundcloudIcon}
                              alt="Soundcloud"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Soundcloud</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Linkedin" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.linkedin.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={LinkedinIcon}
                              alt="Linkedin"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Linkedin</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "TikTok" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"www.tiktok.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={TiktokIcon}
                              alt="Tiktok"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">TikTok</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Spotify" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"www.spotify.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={SpotifyIcon}
                              alt="Spotify"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Spotify</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Apple Music" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.apple.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={AppleMusicIcon}
                              alt="Apple Music"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Apple Music</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Venmo" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://www.venmo.com/" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={VenmoIcon}
                              alt="Venmo"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Venmo</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "CashApp" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"https://cash.app/$" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={CashappIcon}
                              alt="CashApp"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">CashApp</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Website" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={WebsiteIcon}
                              alt="Website"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Website</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "CustomURL" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={CustomURLIcon}
                              alt="CustomURL"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Custom URL</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Paypal" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={
                          "https://www.paypal.com/paypalme/" + elemento.profile
                        }
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={PaypalIcon}
                              alt="Paypal"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Paypal</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "SMS" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={"sms:" + elemento.profile}
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={SmsIcon}
                              alt="Sms"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">SMS</div>
                          </div>
                        </div>
                      </a>
                    ) : elemento.socialNetwork === "Address" ? (
                      <a
                        className="btn-no-style"
                        target="_blank"
                        href={
                          "https://google.com/maps/search/" +
                          convertStringWithPlus(elemento.profile)
                        }
                      >
                        <div className="pt-3 pb-3">
                          <div className="d-flex justify-content-center">
                            <img
                              width="50"
                              height="50"
                              src={MapPinIcon}
                              alt="Instagram"
                            />
                          </div>

                          <div className="d-flex justify-content-center">
                            <div className="d-none d-sm-block">Address</div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <></>
                    )
                  }
                </div>
              ))}
            </div>

            {/*Botón Copiar Link*/}
            <div className="row p-3">
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
            </div>

            {/*Botón Copiar Link*/}
            <div className="row p-3">
              <div className="col-lg-12">
                <div className="d-flex justify-content-center">
                  <div className="border p-3 border-link">
                    <div className="d-flex justify-content-center">
                      <h5 className="font-bold pb-3">QR Code</h5>
                    </div>
                    <QRCode
                      id="QR"
                      value={"https://profile.stdicompany.com/" + username}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="alert-information">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <a
                  className="text-white font-bold"
                  href="https://shop.stdicompany.com/"
                  target="_blank"
                >
                  STDI rocks, right? Tap here to get yours.
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

          {/* Comantado ya que se usará para la info privada
            <div className="row d-flex justify-content-center h5">
                <div className="m-2 card col-sm-3" onClick={viewPrivateLinks} style={{cursor: 'pointer'}}>
                    <div className="card-body">
                        <span className="btn-sm" style={{backgroundColor: 'black', 
                            borderRadius: '15px',
                            textAlign: 'center', color: 'white' }}
                        >
                        <i className="bi bi-lock-fill"></i></span>
                        &#160;<label style={{ color: "black" }}> Private</label>
                    </div>
                </div>
            </div>*/}
        </div>
      )}
    </div>
  );
};
