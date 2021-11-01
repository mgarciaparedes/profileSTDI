import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import history from "../../../components/History";
import { SpinnerLoading } from "../../../components/SpinnerLoading";

export const ActivateLinkedProfile = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const { pathname } = location;
  const username = pathname.replace("/activateLinkedProfile/", "");
  const payload = {
    usernameToActivateLink: username,
  };

  useEffect(() => {
    setLoading(true);
    axios
      .post("users/activateLinkingProfile", payload)
      .then((res) => {
        setLoading(false);
        const { ok, msg } = res.data;

        if (ok && msg === "Linked profile enabled succesfully") {
          Swal.fire({
            title: "Proccess sucesfully",
            text: msg,
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            history.push("/");
          });
        } else {
          Swal.fire({
            title: "An error occurred",
            text: msg,
            icon: "error",
            confirmButtonText: "OK",
          }).then((result) => {
            history.push("/");
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "An error occurred",
          text: "We are sorry, contact the admin of this site.",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          history.push("/");
        });
      });
  }, []);
  return <>{loading ? <SpinnerLoading /> : null}</>;
};
