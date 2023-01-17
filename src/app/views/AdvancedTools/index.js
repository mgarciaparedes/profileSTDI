import React, { useState, useContext, useEffect } from "react";
import { Alert, Form } from "react-bootstrap";
import axios from "axios";
import history from "../../../components/History";
import Swal from "sweetalert2";
import { SideNavigation } from "../../../components/SideNavigation";
import { AppContext } from "../../../components/AppContext";
import logoImage from "../../../assets/images/logo-white.gif";
import * as Icon from "react-bootstrap-icons";

//Componentes Hijos
import SendNotifications from "./childrenComponents/SendNotifications";
import LinkToAnotherProfile from "./childrenComponents/LinkToAnotherProfile";
import GallerySetup from "./childrenComponents/GallerySetup";
import CustomImageSetup from "./childrenComponents/CustomImageSetup";

export const AdvancedTools = () => {
  const { objLogin } = useContext(AppContext);

  //uso este servicio para validar que haya token en la petición
  //Con esto evitamos que si se cae el token o el objLogin o se recarga la página pueda funcionar el front
  useEffect(() => {
    axios
      .get("/users/getProfileUserData")
      .then((res) => {
        const { ok } = res.data;

        if (!ok) {
          Swal.fire({
            title: "This session is over",
            text: "Please login again",
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            history.push("/");
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "This session is over",
          text: "Please login again",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          history.push("/");
        });
      });
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            {/* <div className="text-white mt-2">
              {objLogin.username}&nbsp;&nbsp;
            </div> */}
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
                <Icon.ExclamationCircleFill className="mb-1" size={20} />
                &nbsp; In this area you can add more advanced tools such as
                customizing your profile buttons, adding a photo gallery, and
                sub functions that will be explained when activating each
                function.
              </Alert>

              {/*Opción activar notificaciones */}
              <SendNotifications />

              {/*Opción Linkear a otro perfil */}
              <LinkToAnotherProfile />

              {/*Opción configurar galería de imágenes */}
              <GallerySetup />

              {/*Opción configurar custom Image Button */}
              <CustomImageSetup />
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
            QTap rocks, right? Tap here to get yours.
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
          <h5 className="font-bold">QTap</h5>
        </div>
        <div className="d-flex justify-content-center">
          <h6>All features registered &copy;</h6>
        </div>
      </div>
    </>
  );
};
