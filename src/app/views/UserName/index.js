import React, {useEffect, useState} from 'react';
import userImage from "../../../assets/images/default-user-image.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import history from "../../../components/History";
import axios from "axios";
import helpers from "../../../components/Helpers";
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";

  const { swalOffBackend } = helpers;
  const QRCode = require("qrcode.react");

/*Componente para manejar nombre del usuario*/
export const UserName = ({location}) => {

    const [ profileName, setProfileName ] = useState("");
    const [ socialMedia, setSocialMedia ] = useState([]);

    const { pathname } = location;
    const username = pathname.replace("/", "");

    const payload = {
        username: username,
    };

    useEffect(() => {
        axios.post("/users/usernameData", payload).then((res) => {

            const { ok, msg, data } = res.data;

            if(ok && msg === "Username Profile Data found."){
              
                const { profileFullName, profileBio, socialMedia } = data;
                setProfileName(profileFullName);
                setSocialMedia(socialMedia);
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
              })
              .then((result) => {
                if (result.isConfirmed) {
                  history.push("/login");
                } else {
                  history.push("/login");
                }
              });


            }
        });

      }, [])

    const viewPrivateLinks = () => {
        Swal.fire({
            title: "PIN",
            html: `<input type="password" placeholder="PIN to unlock private information" 
            className="swal2-input" maxLength="4">`,
            icon: "warning",
            confirmButtonText: "OK",
        }); 
    }

    return (
        <div style={{width: '100%'}}>
            <div
                style={{backgroundColor: '#424242', padding: '20%', marginBottom: '-70px'}}>
            </div>
            <div className="g-white col-sm-12 card-body" style={{backgroundColor: 'white'}}>
                <div className="row justify-content-center">
                    <img src={userImage} className="rounded-circle img-profile"   width="150"/>
                </div>

                <div className="row d-flex justify-content-center h5">
                    <h3 style={{ color: "black" }}>{profileName} ({username}).</h3>
                </div>

                <div className="row">
                    <div className="col-sm-12 text-center">
                        <a  href="/edit-profile" className="mr-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Edit Profile</a>
                        <a className="ml-2 btn btn-primary btn-sm center-block" style={{width: "100px"}}>Sign Out</a>
                    </div>
                </div>

                <div className="row d-flex justify-content-center h5">
                    {socialMedia.map((elemento, index) => (
                        <div key={index} className="m-2 card col-sm-3">
                            <div className="card-body">
                                { 
                                    /*Según la red que responde el servicio, condicionamos que red social mostrar*/
                                    (elemento.socialNetwork === "Youtube") ?
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: 'red', 
                                            borderRadius: '15px',
                                            textAlign: 'center', color: 'white' }}
                                        >
                                        <i className="bi bi-youtube"> </i></span>&#160; 
                                        <label style={{ color: "black" }}> {elemento.profile}</label>
                                    </> : 
                                    ((elemento.socialNetwork === "Twitter") ? 
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: '#1DA1F2', 
                                        borderRadius: '15px',
                                        textAlign: 'center', color: 'white' }}
                                        >
                                        <i className="bi bi-twitter"></i></span>&#160; 
                                        <label style={{ color: "black" }}> {elemento.profile}</label>
                                    </> : 
                                    (elemento.socialNetwork === "Instagram") ?
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: '#FF0080', 
                                            borderRadius: '15px',
                                            textAlign: 'center', color: 'white' }}
                                        >
                                            <i className="bi bi-instagram"></i></span>&#160; 
                                        <label style={{ color: "black" }}> {elemento.profile}</label>
                                    </> : 
                                    (elemento.socialNetwork === "Facebook") ? 
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: '#3b5998', 
                                            borderRadius: '15px',
                                            textAlign: 'center', color: 'white' }}
                                        >
                                        <i className="bi bi-facebook"></i></span>&#160; 
                                        <label style={{ color: "black" }}> {elemento.profile}</label>
                                    </> : (elemento.socialNetwork === "Email") ?
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: 'gray', 
                                            borderRadius: '15px',
                                            textAlign: 'center', color: 'white' }}
                                        >
                                            <i className="bi bi-envelope-fill"></i></span>&#160; 
                                        <label style={{ color: "black" }}> Email</label>
                                    </> : (elemento.socialNetwork === "Phone Number") ? 
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: 'black', 
                                            borderRadius: '15px',
                                            textAlign: 'center', color: 'white' }}
                                        >
                                            <i className="bi bi-person-lines-fill"></i></span>&#160; 
                                        <label style={{ color: "black" }}>Phone Number</label>
                                    </> : (elemento.socialNetwork === "Snapchat") ? 
                                    <></> : (elemento.socialNetwork === "Soundcloud") ? 
                                    <></> : (elemento.socialNetwork === "Linkedin") ? 
                                    <>
                                        <span className="btn-sm" style={{backgroundColor: '#0e76a8', 
                                                borderRadius: '15px',
                                                textAlign: 'center', color: 'white' }}
                                            >
                                            <i className="bi bi-linkedin"></i></span>&#160; 
                                            <label style={{ color: "black" }}> {elemento.profile}</label>
                                    </> : <></>
                                    )
                                }
                            </div>
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
            </div>*/ }
        </div>
    )
}
