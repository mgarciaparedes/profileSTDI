import React from 'react';
import userImage from "../../../assets/images/default-user-image.png";
import bg from "../../../assets/images/test.png";
import "bootstrap-icons/font/bootstrap-icons.css";

export const ViewProfile = () => {

    console.log(bg);

    return (
        <>
            <div
                style={{width: '100%', backgroundColor: '#424242', padding: '20%', marginBottom: '-70px'}}>
            </div>

            <div className="row justify-content-center">
                    <img src={userImage} class="rounded-circle"  width="150"/>
            </div>

            <div className="row d-flex justify-content-center h5">
                <h3 style={{ color: "white" }}>John Doe.</h3>
            </div>

            <div className="row d-flex justify-content-center h5">
                <div className="col-sm-4 text-center">
                    <a href="/edit-profile" className="btn btn-primary btn-sm">
                        Edit Profile
                    </a>
                </div>
                <div className="col-sm-4 text-center">
                    <button className="btn btn-primary btn-sm">
                        Sign Out
                    </button>                            
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
                            <i class="bi bi-linkedin"></i></span>&#160; 
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
        </>
    )
}
