import React, { useState, useContext } from "react";
import { Alert, Carousel } from "react-bootstrap";
import { SideNavigation } from "../../../components/SideNavigation";
import { AppContext } from "../../../components/AppContext";
import logoImage from "../../../assets/images/logo-white.gif";
import banner from "../../../assets/images/Banner.jpg";
import banner2 from "../../../assets/images/Banner2.png";
import * as Icon from "react-bootstrap-icons";

export const Dashboard = () => {
  const { objLogin } = useContext(AppContext);
  const [show, setShow] = useState(true);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className="container mt-3 pr-4">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-end">
            {/* <div className="text-white mt-2">
              {objLogin.username}&nbsp;&nbsp;
            </div> */}
            <SideNavigation />
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
              <Alert variant="warning" className="mb-1 pb-1 mt-3">
                <p>
                  <Icon.PersonCircle size={20} /> &nbsp; Hi there,{" "}
                  <b>{objLogin.user}</b>.
                </p>
              </Alert>
              <div className="text-center mt-3">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={banner}
                      alt="First slide"
                    />

                    <Carousel.Caption>
                      <h3>Set up your Profile</h3>
                      <p>
                        Tap in the button on top to display setup options.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={banner2}
                      alt="First slide"
                    />

                    <Carousel.Caption>
                      <h3>
                      Stay tunned!
                      </h3>
                      <p>
                        We share news and updates in this section.
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
              <Alert variant="info mt-3 pb-1">
                <p>
                  <strong> Wanna learn more?</strong>{" "}
                  <a target="_blank" href="https://www.stdicompany.com/">
                    Tap here to see more
                  </a>
                </p>
                <p>
                  <strong> Wanna contact us?</strong>{" "}
                  <a target="_blank" href="https://www.stdicompany.com/contact">
                    Tap here to contact us
                  </a>
                </p>
              </Alert>
              {/*<Alert variant="warning mt-3">
                <p className="mt-2">
                  Hi there, <b>{objLogin.user}</b>.
                </p>
                <p>
                  Welcome to your QTap profile control panel, this is where you
                  can set the data and links you want to share.
                </p>
                <p>
                  We hope we can fill the void of your needs and may exceed your
                  expectations.
                </p>
                <p>Thank you for your time.</p>
                <p>Sincerely,</p>
                <p>- QTap Team.</p>
              </Alert>
               <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>
              <p>
                Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. 
              </p> */}
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
