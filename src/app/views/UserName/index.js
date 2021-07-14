import React from 'react';
import userImage from "../../../assets/images/default-user-image.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


/*Componente para manejar nombre del usuario*/
export const UserName = ({location}) => {

    const { pathname } = location;
    const username = pathname.replace("/", "");

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
        <>
            <div
                style={{width: '100%', backgroundColor: '#424242', padding: '20%', marginBottom: '-70px'}}>
            </div>

            <div className="row justify-content-center">
                    <img src={userImage} className="rounded-circle"  width="150"/>
            </div>

            <div className="row d-flex justify-content-center h5">
                <h3 style={{ color: "white" }}>John Doe ({username}).</h3>
            </div>

            <div className="row">
                <div className="col-sm-12 text-center">
                    <a  href="/edit-profile" className="mr-2 btn btn-primary btn-sm center-block" Style="width: 100px;">Edit Profile</a>
                    <a className="ml-2 btn btn-primary btn-sm center-block" Style="width: 100px;">Sign Out</a>
                </div>
            </div>

            <div className="row d-flex justify-content-center h5">
                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: '#FF0080', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                                <i className="bi bi-instagram"> </i></span>&#160; 
                            <label style={{ color: "black" }}>Instagram</label>
                    </div>
                </div>

                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: 'black', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                            |<i className="bi bi-person-lines-fill"></i></span>&#160; 
                            <label style={{ color: "black" }}>Phone Number</label>
                    </div>
                </div>

                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: 'red', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                                <i className="bi bi-youtube"> </i></span>&#160; 
                            <label style={{ color: "black" }}> Youtube</label>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center h5">
                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: '#0e76a8', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                            <i className="bi bi-linkedin"></i></span>&#160; 
                            <label style={{ color: "black" }}> Liknedin</label>
                    </div>
                </div>
                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: '#1DA1F2', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                                <i className="bi bi-twitter"></i></span>&#160; 
                            <label style={{ color: "black" }}> Twitter</label>
                    </div>
                </div>
                <div className="m-2 card col-sm-3">
                    <div className="card-body">
                            <span className="btn-sm" style={{backgroundColor: 'gray', 
                                borderRadius: '15px',
                                textAlign: 'center', color: 'white' }}
                            >
                                <i className="bi bi-envelope-fill"></i></span>&#160; 
                            <label style={{ color: "black" }}> Email</label>
                    </div>
                </div>
            </div>

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
            </div>
        </>
    )
}
