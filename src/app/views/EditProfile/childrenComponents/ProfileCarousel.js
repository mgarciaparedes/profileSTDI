import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
// import imagen from "../../../../assets/images/fondoperfilprueba.jpg";
// import noBanner from "../../../../assets/images/no-banner.jpg";

export const ProfileCarousel = ({gallery}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
    {gallery ? gallery.galleryActive && gallery.galleryImages !== null ? (
      <div className="row p-2 mb-2">
        <div className="col-lg-12">
          <div className="d-flex justify-content-center">
            <Carousel activeIndex={index} onSelect={handleSelect}>

              {gallery.galleryImages.map((elemento, index) => 
                <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={`${process.env.REACT_APP_API_URL}/render/image/${elemento.image}`}
                  alt="First slide"
                />
                <Carousel.Caption>
                  {/* <h3>First slide label</h3> */}
                  {/* <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p> */}
                </Carousel.Caption>
              </Carousel.Item>
              )}
              

              {/* <Carousel.Item>
                
                <img
                  className="d-block w-100"
                  src={imagen}
                  alt="First slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                
                <img
                  className="d-block w-100"
                  src={imagen}
                  alt="First slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>*/}
              
            </Carousel> 
          </div>
        </div>
      </div>) : null : null}
    </>
  );
};
