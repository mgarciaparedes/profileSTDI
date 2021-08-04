import React from "react";

export const YoutubeEmbedVideo = ({ socialMedia }) => {
  return (
    <>
      {socialMedia.map((elemento, index) => (
        <>
          {elemento.socialNetwork === "Embed Youtube Video" ? (
            <div
            key={index}
            className="p-3 w100 d-flex justify-content-center"
          >
            <iframe
              width="560"
              height="200"
              src={"https://www.youtube.com/embed/"+elemento.profile}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          ) : null}
        </>
      ))}
    </>
  );
};
