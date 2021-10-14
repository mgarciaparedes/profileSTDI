import React, { useState, useContext } from "react";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../../../../components/AppContext";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";

function ActivateNotifications() {
  const { objLogin, setGPSNotificationsSelectedContext } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [sendNotifications, setSendNotifications] = useState(
    objLogin.sendNotifications
  );

  const changeGPSNotificationsStatus = (isChecked) => {
    setLoading(true);

    const payloadGPSNotifications= {
      username: objLogin.username,
      sendNotifications: isChecked,
    };

    axios
      .post("/users/activateGPSNotifications", payloadGPSNotifications)
      .then((res) => {
        //console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const sendEmailNotifications = (e) => {
    //alert(e.target.checked);
    setSendNotifications(e.target.checked);
    setGPSNotificationsSelectedContext(e.target.checked);
    changeGPSNotificationsStatus(e.target.checked);
  };
  return (
    <div className="mb-3">
      {loading ? <SpinnerLoading /> : null}
      <Form.Label
        className="text-white form-label pb-0 mb-0"
        htmlFor="basic-url"
      >
        Activate GPS Notifications:
      </Form.Label>
      <InputGroup>
        <Form.Check
          type="switch"
          name="ActivateNotifications"
          id="custom-switch"
          label={
            sendNotifications ? (
              <b className="text-success"> Enabled </b>
            ) : (
              <b className="text-warning"> Disabled </b>
            )
          }
          checked={sendNotifications === true ? true : false}
          onChange={(e) => {
            sendEmailNotifications(e);
          }}
        />
      </InputGroup>
    </div>
  );
}

export default ActivateNotifications;
