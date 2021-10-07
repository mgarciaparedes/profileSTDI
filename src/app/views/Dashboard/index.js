import React, { useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { SideNavigation } from "../../../components/SideNavigation";
import { AppContext } from "../../../components/AppContext";

export const Dashboard = () => {
  const { objLogin } = useContext(AppContext);
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="container mt-3 pr-4">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <div className="text-white mt-2">
              {objLogin.userName}&nbsp;&nbsp;
            </div>
            <SideNavigation
            //   name={name}
            //   username={username}
            //   serialNumber={serialNumber}
            //   email={email}
            //   setSendNotifications={setSendNotifications}
            //   sendNotifications={sendNotifications}
            //   isLinked={isLinked}
            //   usernameLinked={usernameLinked}
            //   setIsLinked={setIsLinked}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-white">
            {/*<Alert variant="danger" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! This is a notification!</Alert.Heading>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum.
              </p>
            </Alert>

            <Alert variant="info" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! This is a notification!</Alert.Heading>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum.
              </p>
            </Alert>

            <Alert variant="warning" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! This is a notification!</Alert.Heading>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum.
              </p>
            </Alert>

            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! This is a notification!</Alert.Heading>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
                eget lacinia odio sem nec elit. Cras mattis consectetur purus
                sit amet fermentum.
              </p>
  </Alert>*/}
          </div>
        </div>
      </div>
    </>
  );
};
