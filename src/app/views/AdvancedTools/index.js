import React, { useState, useContext } from "react";
import { Alert, Form } from "react-bootstrap";
import { SideNavigation } from "../../../components/SideNavigation";
import { AppContext } from "../../../components/AppContext";
import logoImage from "../../../assets/images/logo-white.png";
import * as Icon from "react-bootstrap-icons";

//Componentes Hijos
import SendNotifications from "./childrenComponents/SendNotifications";
import LinkToAnotherProfile from "./childrenComponents/LinkToAnotherProfile";
import GallerySetup from "./childrenComponents/GallerySetup";

export const AdvancedTools = () => {
  const { objLogin } = useContext(AppContext);;
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <div className="text-white mt-2">
              {objLogin.username}&nbsp;&nbsp;
            </div>
            <SideNavigation />
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="container text-white">
          <div className="row">
            <div className="col-12">
              <h5 className="mt-4 mb-3">Advanced Tools:</h5>

              <Alert variant="info">
                <Icon.InfoCircleFill className="mb-1" size={20} />
                &nbsp;
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Alert>

              {/*Opción activar notificaciones */}
              <SendNotifications />

              {/*Opción Linkear a otro perfil */}
              <LinkToAnotherProfile />

              {/*Opción Linkear a otro perfil */}
              <GallerySetup />
            </div>
          </div>
        </div>
      </div>

      <div className="alert-information mt-5">
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

      <div className="pt-3 text-white">
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
    </>
  );
};
