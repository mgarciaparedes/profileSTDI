import React, { useEffect, useState } from "react";
import userImage from "../../../assets/images/default-user-image.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import history from "../../../components/History";
import axios from "axios";
import helpers from "../../../components/Helpers";
import { Switch, Route, Redirect } from "react-router-dom";

/*Iconos que no están en boostrap-icons.css*/
import SnapchatIcon from "../../../assets/fonts/iconfinder_snapchat.svg";
import AppleMusicIcon from "../../../assets/fonts/iconfinder_apple_music.svg";
import CashappIcon from "../../../assets/fonts/iconfinder_cashapp.svg";
import SoundcloudIcon from "../../../assets/fonts/iconfinder_soundcloud.svg";
import SpotifyIcon from "../../../assets/fonts/iconfinder_spotify.svg";
import TiktokIcon from "../../../assets/fonts/iconfinder_tiktok.svg";
import VenmoIcon from "../../../assets/fonts/iconfinder_venmo.svg";
import PaypalIcon from "../../../assets/fonts/iconfinder_paypal.svg";
import MapPinIcon from "../../../assets/fonts/iconfinder_map_pin.svg";

const { swalOffBackend } = helpers;
const QRCode = require("qrcode.react");

/*Componente para manejar nombre del usuario*/
export const UserName = ({ location }) => {
  const [profileName, setProfileName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [socialMedia, setSocialMedia] = useState([]);

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
          const { profileFullName, profileBio, socialMedia } = data;
          setProfileName(profileFullName);
          setSocialMedia(socialMedia);
          setProfileBio(profileBio);
        }
      })
      .catch((e) => {
        if (e.response === undefined) {
          swalOffBackend();
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
    <div style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "#424242",
          padding: "20%",
          marginBottom: "-70px",
        }}
      ></div>
      <div
        className="g-white col-sm-12 card-body"
        style={{ backgroundColor: "white" }}
      >
        <div className="row justify-content-center">
          <img
            src={userImage}
            className="rounded-circle img-profile"
            width="150"
          />
        </div>

        <div className="row d-flex justify-content-center h5">
          <h3 style={{ color: "black" }}>
            {profileName}
          </h3>
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
            <div key={index} className="border m-2 col-sm-3">
              {
                /*Según la red que responde el servicio, condicionamos que red social mostrar*/
                elemento.socialNetwork === "Youtube" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.youtube.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "red",
                            fontSize: "40px",
                          }}
                          className="bi bi-youtube"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Youtube
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Twitter" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.twitter.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#1DA1F2",
                            fontSize: "40px",
                          }}
                          className="bi bi-twitter"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Twitter
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Instagram" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.instagram.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#FF0080",
                            fontSize: "40px",
                          }}
                          className="bi bi-instagram"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Instagram
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Facebook" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.facebook.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#3b5998",
                            fontSize: "40px",
                          }}
                          className="bi bi-facebook"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Facebook
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Email" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"mailto:" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#95A5A6",
                            fontSize: "40px",
                          }}
                          className="bi bi-envelope"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">Email</div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Phone Number" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"tel:" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#239B56",
                            fontSize: "40px",
                          }}
                          className="bi bi-telephone-forward-fill"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Phone Number
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Snapchat" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.snapchat.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={SnapchatIcon} alt="Snapchat" />
                      </div>

                      <div className="d-flex justify-content-center">
                        Snapchat
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Soundcloud" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.soundcloud.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={SoundcloudIcon} alt="Soundcloud" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Soundcloud
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Linkedin" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.linkedin.com/" + elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#2867B2",
                            fontSize: "40px",
                          }}
                          className="bi bi-linkedin"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Linkedin
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Social Media Sites" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        {/*<i
                          style={{
                            color: "#2867B2",
                            fontSize: "40px",
                          }}
                          className="bi bi-linkedin"
                        >
                          {""}
                        </i>*/}
                        Social Media Sites
                      </div>

                      <div className="d-flex justify-content-center">
                        Social Media Sites
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "TikTok" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={"www.tiktok.com/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={TiktokIcon} alt="Tiktok" />
                      </div>
                      <div className="d-flex justify-content-center">
                        TikTok
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Spotify" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={"www.spotify.com/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={SpotifyIcon} alt="Spotify" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Spotify
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Apple Music" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.apple.com/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={AppleMusicIcon} alt="AppleMusic" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Apple Music
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Venmo" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.venmo.com/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={VenmoIcon} alt="Tiktok" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Venmo
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "CashApp" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://cash.app/$"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={CashappIcon} alt="Cashapp" />
                      </div>
                      <div className="d-flex justify-content-center">
                        CashApp
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Website" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#2867B2",
                            fontSize: "40px",
                          }}
                          className="bi bi-box-arrow-up-right"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        Website
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "CustomURL" ? (
                    <a
                    className="btn-no-style"
                    target="_blank"
                    href={elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center">
                        <i
                          style={{
                            color: "#2867B2",
                            fontSize: "40px",
                          }}
                          className="bi bi-pin-angle"
                        >
                          {""}
                        </i>
                      </div>

                      <div className="d-flex justify-content-center">
                        {elemento.profile}
                      </div>
                    </div>
                  </a>
                ) : elemento.socialNetwork === "Paypal" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://www.paypal.com/paypalme/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="40" height="40" src={PaypalIcon} alt="Paypal" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Paypal
                      </div>
                    </div>
                  </a>
              ) : elemento.socialNetwork === "Address" ? (
                  <a
                    className="btn-no-style"
                    target="_blank"
                    href={"https://google.com/maps/search/"+elemento.profile}
                  >
                    <div className="pb-2">
                      <div className="d-flex justify-content-center mt-3">
                        <img width="25" height="35" src={MapPinIcon} alt="mappin" />
                      </div>
                      <div className="d-flex justify-content-center">
                        Address
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

        <div className="row p-3">
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
              <QRCode value={"https://profile.stdicompany.com/" + username} />
            </div>
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
  );
};
