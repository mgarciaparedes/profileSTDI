import React, { createContext, useState, useEffect } from "react";
import history from "./History";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swal from "sweetalert2";
import axios from "axios";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [objLogin, setObjLogin] = useState({
    authenticated: false,
    user: "",
    token: "",
    email: "",
    serialNumber: "",
    username: "",
    profileData: [],
    sendNotifications: false,
    isLinked: false,
    usernameLinked: "",
  });

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("APP::DATA").then((value) => {
        if (value === null) {
        } else {
          let objStorage = JSON.parse(value);
          if (JSON.parse(objStorage.authenticated) !== false) {
            const json = {
              authenticated: objStorage.authenticated,
              user: objStorage.user,
              token: objStorage.token,
              email: objStorage.email,
              serialNumber: objStorage.serialNumber,
              username: objStorage.username,
              profileData: objStorage.profileData,
              sendNotifications: objStorage.sendNotifications,
              isLinked: objStorage.isLinked,
              usernameLinked: objStorage.usernameLinked,
            };
            setObjLogin(json);
            //axios.defaults.headers.common["Authorization"] = objStorage.token;
            axios.defaults.headers.common["x-token"] = objStorage.token;
            //history.push("/edit-profile");
          } else {
            history.push("/login");
          }
        }
      });
    })();
  }, []);

  useEffect(() => {
    if (JSON.parse(objLogin.authenticated) !== false) {
      var objJson = JSON.stringify(objLogin);
      AsyncStorage.setItem("APP::DATA", objJson);
    }
  }, [objLogin]);

  const loginContext = (obj) => {
    setObjLogin(obj);
    // setAcceptPolicies(false);
    //sessionTimeContext(obj.timeOutSession);
  };

  const logoutContext = () => {
    Swal.fire({
      title: "Wanna go out?",
      text: "",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        const json = {
          authenticated: false,
          userName: "",
          token: "",
        };
        setObjLogin(json);
        AsyncStorage.clear();
        //axios.defaults.headers.common["Authorization"] = "";
        axios.defaults.headers.common["x-token"] = "";
        //setShowModalLogout(false);
        //objTimer.pause();
        history.push("/login");
      }
    });
  };

  const setGPSNotificationsSelectedContext = (
    isChecked
  ) => {
    (async () => {
      await AsyncStorage.getItem("APP::DATA").then((value) => {
        if (value === null) {
        } else {
          let objStorage = JSON.parse(value);
          if (JSON.parse(objStorage.authenticated) === true) {
            const json = {
              authenticated: objStorage.authenticated,
              user: objStorage.user,
              token: objStorage.token,
              email: objStorage.email,
              serialNumber: objStorage.serialNumber,
              username: objStorage.username,
              profileData: objStorage.profileData,
              sendNotifications: isChecked,
              isLinked: objStorage.isLinked,
              usernameLinked: objStorage.usernameLinked,
            };
            setObjLogin(json);
          }
        }
      });
    })();
  };

  const setLinkToExistentProfileContext = (
    isLinkedStatus,
    usernameLinkedStatus,
  ) => {
    (async () => {
      await AsyncStorage.getItem("APP::DATA").then((value) => {
        if (value === null) {
        } else {
          let objStorage = JSON.parse(value);
          if (JSON.parse(objStorage.authenticated) === true) {
            const json = {
              authenticated: objStorage.authenticated,
              user: objStorage.user,
              token: objStorage.token,
              email: objStorage.email,
              serialNumber: objStorage.serialNumber,
              username: objStorage.username,
              profileData: objStorage.profileData,
              sendNotifications: objStorage.sendNotifications,
              isLinked: isLinkedStatus,
              usernameLinked: usernameLinkedStatus,
            };
            setObjLogin(json);
          }
        }
      });
    })();
  };

  return (
    <AppContext.Provider
      value={{
        loginContext,
        logoutContext,
        objLogin,
        setGPSNotificationsSelectedContext,
        setLinkToExistentProfileContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
