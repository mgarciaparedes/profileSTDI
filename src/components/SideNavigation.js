import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { AppContext } from "./AppContext";
import history from "./History";

import ModalChangePassword from "./ModalChangePassword";
import SendNotifications from "./SendNotifications";
import LinkToAnotherProfile from "./LinkToAnotherProfile";

export const SideNavigation = ({
  name,
  username,
  serialNumber,
  email,
  setSendNotifications,
  sendNotifications,
  isLinked,
  usernameLinked,
  setIsLinked,
}) => {
  const { logoutContext } = useContext(AppContext);
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "300px";
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
        <a href="/dashboard">
          <Icon.House size={22} className="mb-1" /> Home
        </a>

        {/****** Opción HOME ******/}
        <a href="javascript:void(0)" onClick={() => history.push("/edit-profile")}>
          <Icon.PencilSquare size={22} className="mb-1" /> Set Up Profile
        </a>

        {/****** Opción GPS NOTIFICATIONS ******/}
        <a href="javascript:void(0)">
          <SendNotifications
            setSendNotifications={setSendNotifications}
            sendNotifications={sendNotifications}
          />
        </a>

        {/****** Opción CONECTAR A OTRO PERFIL ******/}
        <a href="javascript:void(0)">
          <LinkToAnotherProfile
            isLinked={isLinked}
            usernameLinked={usernameLinked}
            username={username}
            setIsLinked={setIsLinked}
          />
        </a>

        {/****** Opción Cambiar Password ******/}
        <ModalChangePassword
          name={name}
          username={username}
          serialNumber={serialNumber}
          email={email}
        />

        {/****** Opción Terminar Sesión ******/}
        <a
          href="javascript:void(0)"
          onClick={() => {
            //history.push("/login");
            logoutContext();
          }}
        >
          <Icon.Power size={22} className="mb-1" /> Log out
        </a>
      </div>

      <Button className="button-transparent" onClick={() => openNav()}>
        <Icon.List size={22} />
      </Button>
    </>
  );
};
