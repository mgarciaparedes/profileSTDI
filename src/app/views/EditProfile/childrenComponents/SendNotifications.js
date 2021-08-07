import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

function ActivateNotifications({ sendNotifications, setSendNotifications }) {
  const sendEmailNotifications = (e) => {
    //alert(e.target.checked);
    setSendNotifications(e.target.checked);
  };
  return (
    <>
      <Form.Label
        className="text-white form-label pb-0 mb-0"
        htmlFor="basic-url"
      >
        Activate Notifications:
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
    </>
  );
}

export default ActivateNotifications;
