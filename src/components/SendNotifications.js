import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function ActivateNotifications({ sendNotifications, setSendNotifications }) {
  const sendEmailNotifications = (e) => {
    //alert(e.target.checked);
    setSendNotifications(e.target.checked);
  };
  return (
    <div className="">
      <span
        className="text-white pb-0 mb-0"
        htmlFor="basic-url"
      >
        <Icon.GeoAlt size={22} className="mb-1" /> GPS Notifications
      </span>
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
