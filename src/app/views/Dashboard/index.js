import React, { useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { SideNavigation } from "../../../components/SideNavigation";
import { AppContext } from "../../../components/AppContext";
import logoImage from "../../../assets/images/logo-white.png";

export const Dashboard = () => {
  const { objLogin } = useContext(AppContext);
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="container mt-3 pr-4">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            <div className="text-white mt-2">
              {objLogin.username}&nbsp;&nbsp;
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
      </div>
      <div
        className="mt-2"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Alert variant="warning mt-3">
                <p className="mt-2">
                  Hi there, <b>{objLogin.user}</b>.
                </p>
                <p>
                  Welcome to your STDI profile control panel, this is where you
                  can set the data and links you want to share.
                </p>
                <p>
                  We hope we can fill the void of your needs and may exceed your
                  expectations.
                </p>
                <p>Thank you for your time.</p>
                <p>Sincerely,</p>
                <p>- STDI Team.</p>
              </Alert>
              <p>
                If you wanna learn more about us, please watch the next video:
              </p>
              <div className="w100 d-flex justify-content-center">
                <iframe
                  width="560"
                  height="200"
                  src={"https://www.youtube.com/embed/s35MTT9Zcws"}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-3">
                Second thoughts? Watch this to see how it works!
              </p>
              <div className="w100 d-flex justify-content-center mb-3">
                <iframe
                  width="560"
                  height="200"
                  src={"https://www.youtube.com/embed/17nOOa61oHE"}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="alert-information">
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
