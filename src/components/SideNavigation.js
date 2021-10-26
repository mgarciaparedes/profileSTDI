import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AppContext } from "./AppContext";
import history from "./History";

import ModalChangePassword from "./ModalChangePassword";

export const SideNavigation = () => {
  const { logoutContext, objLogin } = useContext(AppContext);
  console.log(objLogin.profileData);
  const openNav = () => {
    // if (window.screen.width < 400) {
    //   document.getElementById("mySidenav").style.width = "100%";
    // } else {
      document.getElementById("mySidenav").style.width = "250px";
    // }
  };

  /* Set the width of the side navigation to 0 */
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  return (
    <>
      <div id="mySidenav" className="sidenav">
        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={() => closeNav()}
        >
          &times;
        </a>

        {/****** Opción HOME ******/}
        <a href="/dashboard" className="mb-3">
          <Icon.House size={22} className="mb-1 mr-2" /> Home
        </a>

        {/****** Opción HOME ******/}
        <a
          href="javascript:void(0)"
          className="mb-3"
          onClick={() => history.push("/edit-profile")}
        >
          <Icon.PencilSquare size={22} className="mb-1 mr-2" /> Set Up Profile
        </a>

        {/****** Opción GPS NOTIFICATIONS ******/}
        {/* <a href="javascript:void(0)">
          <SendNotifications
            setSendNotifications={setSendNotifications}
            sendNotifications={sendNotifications}
          />
        </a> */}

        {/****** Opción CONECTAR A OTRO PERFIL ******/}
        {/* <a href="javascript:void(0)">
          <LinkToAnotherProfile
            isLinked={isLinked}
            usernameLinked={usernameLinked}
            username={username}
            setIsLinked={setIsLinked}
          />
        </a> */}

        {/****** Opción Advanced Tools ******/}
        <a
          href="javascript:void(0)"
          className="mb-3"
          onClick={() => history.push("/advanced-tools")}
        >
          <Icon.Tools size={22} className="mb-1 mr-2" /> Advanced Tools
        </a>

        {/****** Opción Cambiar Password ******/}
        <ModalChangePassword
          name={objLogin.user}
          username={objLogin.username}
          serialNumber={objLogin.serialNumber}
          email={objLogin.email}
        />

        {/****** Opción Terminar Sesión ******/}
        <a
          href="javascript:void(0)"
          className="mb-3"
          onClick={() => {
            //history.push("/login");
            logoutContext();
          }}
        >
          <Icon.Power size={22} className="mb-1 mr-2" /> Log out
        </a>
      </div>

      <Button className="button-transparent" onClick={() => openNav()}>
        <Icon.List size={22} />
      </Button>
    </>
  );
};
